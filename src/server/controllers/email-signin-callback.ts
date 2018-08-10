import { NextFunction, Request, Response } from 'express';

import { UserSession } from '../../shared/contract/UserSession';
import HttpStatusCode from '../../shared/http-status-codes';
import EmailSignin from '../business/email-signin';
import { EmailSigninModel } from '../db/models';
import logger from '../util/logger';

/**
 * GET /callback/email
 */
export default function emailSigninCallbackController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.assert('token', 'Token is missing').isString();

  const validationErrors = req.validationErrors();
  if (validationErrors) {
    return res.status(HttpStatusCode.BadRequest).send(validationErrors);
  }

  const token = req.query.token;

  return EmailSignin.createUserSessionFromToken(token)
    .then((userSession: UserSession) => {
      return res.status(200).json(userSession);
    })
    .catch(EmailSigninModel.NotFoundError, function emailSigninNotFound() {
      logger.info(`EmailSignin token not found`, { token });
      return res.status(HttpStatusCode.NotFound).json({
        message: `No email signin token found. Please sign in again.`
      });
    })
    .catch(EmailSigninModel.TokenExpiredError, function tokenExpiredError(err) {
      logger.info(`EmailSignin token expired`, { token }, err);
      return res.status(HttpStatusCode.Unauthorized).json({
        message: 'Your email signin expired. Please sign in again.'
      });
    })
    .catch(function generelError(err: any) {
      logger.error(`Email signin error`, { token }, err);
      return next(err);
    });
}
