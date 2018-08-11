import Promise from 'bluebird';
import kue, { DoneCallback } from 'kue';

import { REDIS_URL } from '../env';
import logger from '../logger';
import { JobDescription } from './JobDescription';
import { QueueJobType } from './queue-job-type';

const _queue = kue.createQueue({
  prefix: 'q',
  redis: REDIS_URL
});

// Recommended by kue documentation.
_queue.watchStuckJobs(2000);

// Graceful shutdown
process.once('SIGTERM', () => {
  _queue.shutdown(5000, (err: any) => {
    if (err) {
      logger.error(`Queue shutdown with error: ${err}`);
    } else {
      logger.info(`Queue shutdown performed gracefully.`);
    }
    process.exit(0);
  });
});

// Listen to events.
_queue
  .on('error', (err: any) => {
    logger.error(`Queue: error`, err);
  })
  .on('job enqueue', function(id: any, type: QueueJobType) {
    logger.info(`Queue: ${type} job enqueued (id ${id})`);
  })
  .on('job start', function(id: any, type: QueueJobType) {
    logger.info(`Queue: ${type} job started (id ${id})`);
  })
  .on('job progress', function(id: any, type: QueueJobType) {
    logger.info(`Queue: ${type} job progressed (id ${id})`);
  })
  .on('job remove', function(id: any, type: QueueJobType) {
    logger.info(`Queue: ${type} job removed (id ${id})`);
  })
  .on('job complete', function(id: any, type: QueueJobType) {
    logger.info(`Queue: ${type} job completed (id ${id})`);
  })
  .on('job failed', function(id: any, type: QueueJobType) {
    logger.error(`Queue: ${type} job failed (id ${id})`);
  })
  .on('job failed attempt', function(id: any, type: QueueJobType) {
    logger.warn(`Queue: ${type} job failed attempt (id ${id})`);
  });

const _Queue = {
  // Promisify create function.
  create: Promise.method(function createQueueJob(jobDesc: JobDescription) {
    return _queue
      .create(jobDesc.type, jobDesc.data)
      .priority(jobDesc.priority)
      .attempts(jobDesc.attempts)
      .removeOnComplete(true)
      .save((err: any) => {
        if (!err) {
          logger.info(`Job created: ${jobDesc.type}`);
        } else {
          logger.error(
            `Failed to create job: ${jobDesc.type}`,
            jobDesc.data,
            err
          );
          throw err;
        }
      });
  }),

  _queue,

  process: (
    type: QueueJobType,
    number: number,
    callback?: DoneCallback
  ): void => {
    _queue.process(type, number, callback);
  }
};

export default _Queue;
