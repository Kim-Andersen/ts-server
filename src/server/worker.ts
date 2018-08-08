import { DoneCallback, Job } from 'kue';

import queueManager from './util/queue/queue-manager';
import { QueueJobType } from './util/queue/types';

queueManager.process(
  QueueJobType.SendEmailSigninMail,
  (job: Job, done: DoneCallback) => {
    console.log(`Worker ${process.pid} processing home job...`, job.data);
    setTimeout(() => done(undefined, job.data), 3000);
  }
);
