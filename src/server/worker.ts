import { DoneCallback, Job } from 'kue';

import { QueueJobType } from './util/queue/queue-job-type';
import queueManager from './util/queue/queue-manager';

queueManager.process(
  QueueJobType.SendEmailSigninMail,
  (job: Job, done: DoneCallback) => {
    console.log(`Worker ${process.pid} processing home job...`, job.data);
    setTimeout(() => done(undefined, job.data), 3000);
  }
);
