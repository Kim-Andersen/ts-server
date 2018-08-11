import { DoneCallback, Job } from 'kue';

import EmailSignin from './business/email-signin';
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

    EmailSignin.sendEmailSigninMail(job.data.userId)
      .then(result => {
        logger.debug(`sendEmailSigninMail result`, result);
        done(undefined, job.data);
      })
      .catch((err: any) => done(err));
  }
);
