import Promise from 'bluebird';
import kue, { DoneCallback, Job } from 'kue';

import { REDIS_HOST, REDIS_PORT } from '../env';
import logger from '../logger';
import { QueueJobType } from './queue-job-type';

const _queue = kue.createQueue({
  prefix: 'q',
  redis: {
    port: REDIS_PORT,
    host: REDIS_HOST
    // auth: 'password',
    // db: 3, // if provided select a non-default redis db
    // options: {
    //   // see https://github.com/mranney/node_redis#rediscreateclient
    // }
  }
});

const _Queue = {
  create: Promise.method(function(type: QueueJobType, data: any) {
    const job: Job = _queue.create(type, data).save((err: any) => {
      if (!err) {
        logger.info('Succesfully created job', type, data);
      } else {
        logger.error('Failed to create job.', type, data, err);
        throw err;
      }
    });
    return job;
  }),

  process: (type: QueueJobType, callback?: DoneCallback): void => {
    _queue.process(type, callback);
  }
};

// class QueueManager {
//   private queue: Queue;

//   constructor() {
//     // https://github.com/Automattic/kue#redis-connection-settings
//     this.queue = kue.createQueue({
//       prefix: 'q',
//       redis: {
//         port: REDIS_PORT,
//         host: REDIS_HOST
//         // auth: 'password',
//         // db: 3, // if provided select a non-default redis db
//         // options: {
//         //   // see https://github.com/mranney/node_redis#rediscreateclient
//         // }
//       }
//     });
//   }

//   public create(type: QueueJobType, data: any): Job {
//     console.log('QueueManager.create', type);
//     const job: Job = this.queue.create(type, data).save((err: any) => {
//       if (!err) {
//         console.log('Succesfully created job', type, data);
//       } else {
//         console.error('Failed to create job.', type, data, err);
//       }
//     });

//     job
//       .on('complete', (result: any) => {
//         console.log(`Job completed`, type, data);
//       })
//       .on('failed', (errorMessage: any) => {
//         console.log('Job failed :(', errorMessage);
//       })
//       .on('failed attempt', (errorMessage: any, doneAttempts: any) => {
//         console.log('Job attempt failed :|', errorMessage, doneAttempts);
//       })
//       .on('progress', (progress: any, data: any) => {
//         console.log('Job in progres..', progress, data);
//       });

//     return job;
//   }

//   public process(type: QueueJobType, callback?: DoneCallback): void {
//     this.queue.process(type, callback);
//   }
// }

export default _Queue;
