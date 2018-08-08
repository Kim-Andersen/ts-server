import kue, { DoneCallback, Job, Queue } from 'kue';

import { QueueJob, QueueJobType } from './types';

class QueueManager {
  private queue: Queue;

  constructor() {
    // https://github.com/Automattic/kue#redis-connection-settings
    this.queue = kue.createQueue({
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

  public create(queueJobDep: QueueJob): Job {
    console.log('QueueManager.create', queueJobDep.type.toString());
    const job: Job = this.queue
      .create(queueJobDep.type, queueJobDep.data)
      .save((err: any) => {
        if (err) {
          console.log('Succesfully created job', queueJobDep);
        } else {
          console.error('Failed to create job.', queueJobDep, err);
        }
      });

    job
      .on('complete', (result: any) => {
        console.log('Job completed!', result);
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
