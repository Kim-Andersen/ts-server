import { Request, Response } from 'express';

import HttpStatusCode from '../../shared/http-status-codes';

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  return res.status(HttpStatusCode.OK).send('Welcome home!');
};
