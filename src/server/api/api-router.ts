import bodyParser from 'body-parser';
import compression from 'compression';
import express, { Request, Response } from 'express';
import jwt from 'express-jwt';
import expressValidator from 'express-validator';
import lusca from 'lusca';

import { SESSION_SECRET } from '../util/env';
import { getValidateEmailSigninToken, postEmailSignin } from './controllers/email-signin-controller';
import { postNewProject } from './controllers/me';

// Configure the API router.
const router = express.Router({ mergeParams: true });
router.use(compression());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(expressValidator());
router.use(lusca.xframe('SAMEORIGIN'));
router.use(lusca.xssProtection(true));

// Add controllers to the API router.
router.post('/api/auth/email', postEmailSignin);
router.get('/api/auth/email', getValidateEmailSigninToken);

router.post('/me/projects', jwt({ secret: SESSION_SECRET }), postNewProject);

// 404 route catcher.
router.all('*', function(req, res) {
  return res.status(404).json({ error: { error: 'Sorry, nothing here.' } });
});

// Finally add the error handler.
router.use((err: Error, req: Request, res: Response) => {
  if (process.env.NODE_ENV !== 'production') {
    return res.status(500).json({
      error: { code: 'ERROR', message: err.message, stack: err.stack }
    });
  } else {
    return res
      .status(500)
      .json({ error: { code: 'ERROR', message: 'server error' } });
  }
});

export default router;
