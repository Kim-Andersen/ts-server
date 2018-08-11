import { Request, Response } from 'express';

import HttpStatusCode from '../../shared/http-status-codes';
import logger from '../util/logger';

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  if (req.session) {
    req.session.views = req.session.views || 0;

    req.session.views++;
    req.session.save((err: any) => {
      if (err) {
        logger.error('Failed to save session', err);
      }
    });
  }

  return res.status(HttpStatusCode.OK).send(`Welcome home!`);
};
