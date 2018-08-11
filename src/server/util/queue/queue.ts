import Promise from 'bluebird';
import kue, { DoneCallback, Job } from 'kue';

import { REDIS_URL } from '../env';
import logger from '../logger';
import { QueueJobType } from './queue-job-type';

const _queue = kue.createQueue({
  prefix: 'q',
  redis: REDIS_URL
});

const _Queue = {
  create: Promise.method(function createQueueJob(
    type: QueueJobType,
    data: any
  ) {
    const job: Job = _queue.create(type, data).save((err: any) => {
      if (!err) {
        logger.info(`Job created: ${type}`);
      } else {
        logger.error(`Failed to create job: ${type}`, data, err);
        throw err;
      }
    });

    job
      .on('complete', () => {
        logger.info(`Job completed: ${type}`);
      })
      .on('failed', (errorMessage: any) => {
        logger.error(`Job failed: ${type}`, data, errorMessage);
      })
      .on('failed attempt', (errorMessage: any, doneAttempts: any) => {
        logger.alert(
          'Job attempt failed: ${type}',
          data,
          errorMessage,
          doneAttempts
        );
      })
      .on('progress', (progress: any, data: any) => {
        logger.info(`Job in progres: ${type}`, progress);
      });

    return job;
  }),

  process: (type: QueueJobType, callback?: DoneCallback): void => {
    _queue.process(type, callback);
  }
};

export default _Queue;
