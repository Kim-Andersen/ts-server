import { Request, Response } from 'express';
import { Job } from 'kue';

import queueJob from '../util/queue/jobs';
import queueManager from '../util/queue/queue-manager';

// import { queueManager } from '../util/queue';

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  const job: Job = queueManager
    .create(new queueJob.WelcomeHome({ email: 'some@email.com' }))
    .save((err: any) => {
      if (!err) {
        return res.status(200).send('Welcome home!');
      } else {
        return res.status(400).send('Failed');
      }
    });
};
