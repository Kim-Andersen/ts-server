import { DoneCallback, Job } from 'kue';

import queueManager from './util/queue/queue-manager';
import { QueueJobType } from './util/queue/types';

queueManager.process(
  QueueJobType.WelcomeHome,
  (job: Job, done: DoneCallback) => {
    console.log('Worker processing home job...', job.data);
    setTimeout(() => done(undefined, job.data), 3000);
  }
);

setInterval(
  () => console.log(`Worker still running here! ${new Date()}`),
  10000
);
