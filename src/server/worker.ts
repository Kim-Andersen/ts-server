import { DoneCallback, Job } from 'kue';

import logger from './util/logger';
import { mailer } from './util/mail';
import { queue } from './util/queue';
import { JobType } from './util/queue/JobType';

logger.info(`Worker starting up (PID: ${process.pid})`);

process.stderr.on('data', function(data) {
  console.error('stderr', data);
});

queue._queue.process(
  JobType.SendMailMessage,
  10,
  (job: Job, done: DoneCallback) => {
    logger.info(
      `Worker ${process.pid} processing job ${JobType.SendMailMessage}...`,
      JSON.stringify(job.data)
    );

    mailer
      .send(job.data)
      .then(result => done(undefined, result))
      .catch(err => done(err));
  }
);
