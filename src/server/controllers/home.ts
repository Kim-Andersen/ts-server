import { Request, Response } from 'express';

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  return res.status(200).send('Welcome home!');
};
