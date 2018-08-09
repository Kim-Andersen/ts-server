import kue, { DoneCallback, Job, Queue } from 'kue';

import { REDIS_HOST, REDIS_PORT } from '../env';
import { QueueJob, QueueJobType } from './types';

class QueueManager {
  private queue: Queue;

  constructor() {
    // https://github.com/Automattic/kue#redis-connection-settings
    this.queue = kue.createQueue({
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
  }

  public create(queueJob: QueueJob): Job {
    console.log('QueueManager.create', queueJob.type.toString());
    const job: Job = this.queue
      .create(queueJob.type, queueJob.data)
      .save((err: any) => {
        if (!err) {
          console.log('Succesfully created job', queueJob);
        } else {
          console.error('Failed to create job.', queueJob, err);
        }
      });

    job
      .on('complete', (result: any) => {
        console.log(`Job completed`, result);
      })
      .on('failed', (errorMessage: any) => {
        console.log('Job failed :(', errorMessage);
      })
      .on('failed attempt', (errorMessage: any, doneAttempts: any) => {
        console.log('Job attempt failed :|', errorMessage, doneAttempts);
      })
      .on('progress', (progress: any, data: any) => {
        console.log('Job in progres..', progress, data);
      });

    return job;
  }

  public process(type: QueueJobType, callback?: DoneCallback): void {
    this.queue.process(type, callback);
  }
}

export default new QueueManager();
