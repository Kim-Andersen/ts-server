"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kue_1 = __importDefault(require("kue"));
class QueueManager {
    constructor() {
        // https://github.com/Automattic/kue#redis-connection-settings
        this.queue = kue_1.default.createQueue({
            prefix: 'q',
            redis: {
                port: 6379,
                host: '127.0.0.1'
                // auth: 'password',
                // db: 3, // if provided select a non-default redis db
                // options: {
                //   // see https://github.com/mranney/node_redis#rediscreateclient
                // }
            }
        });
    }
    create(queueJob) {
        console.log('QueueManager.create', queueJob.type.toString());
        const job = this.queue
            .create(queueJob.type, queueJob.data)
            .save((err) => {
            if (!err) {
                console.log('Succesfully created job', queueJob);
            }
            else {
                console.error('Failed to create job.', queueJob, err);
            }
        });
        job
            .on('complete', (result) => {
            console.log('Job completed!', result);
        })
            .on('failed', (errorMessage) => {
            console.log('Job failed :(', errorMessage);
        })
            .on('failed attempt', (errorMessage, doneAttempts) => {
            console.log('Job attempt failed :|', errorMessage, doneAttempts);
        })
            .on('progress', (progress, data) => {
            console.log('Job in progres..', progress, data);
        });
        return job;
    }
    process(type, callback) {
        this.queue.process(type, callback);
    }
}
exports.default = new QueueManager();
//# sourceMappingURL=queue-manager.js.map