import { DoneCallback, Job } from 'kue';

import logger from './util/logger';
import { queue } from './util/queue';
import { QueueJobType } from './util/queue/queue-job-type';

logger.info(`Worker starting up (PID: ${process.pid})`);

queue.process(
  QueueJobType.SendEmailSigninMail,
  (job: Job, done: DoneCallback) => {
    logger.info(
      `Worker ${process.pid} processing job ${
        QueueJobType.SendEmailSigninMail
      }...`,
      job.data
    );
    setTimeout(() => done(undefined, job.data), 1000);
  }
);
