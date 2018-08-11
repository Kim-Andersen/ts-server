import { DoneCallback, Job } from 'kue';

import EmailSignin from './business/email-signin';
import logger from './util/logger';
import { queue } from './util/queue';
import { QueueJobType } from './util/queue/queue-job-type';

logger.info(`Worker starting up (PID: ${process.pid})`);

queue._queue.process(
  QueueJobType.SendEmailSigninMail,
  20,
  (job: Job, done: DoneCallback) => {
    logger.info(
      `Worker ${process.pid} processing job ${
        QueueJobType.SendEmailSigninMail
      }...`,
      JSON.stringify(job.data)
    );

    if (!job.data.userId) {
      logger.error(`No userId found in job data`, JSON.stringify(job.data));
      return done(new Error(`No userId found in job data`));
    }

    EmailSignin.sendEmailSigninMail(job.data.userId).catch((err: any) =>
      done(err)
    );
  }
);
