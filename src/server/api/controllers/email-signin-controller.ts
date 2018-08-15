import { NextFunction, Request, Response } from 'express';

import HttpStatusCode from '../../../shared/http-status-codes';
import EmailSignin from '../../business/email-signin';
import { EmailSigninModel } from '../../db/models';
import logger from '../../util/logger';

export const postEmailSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const validationErrors = req.validationErrors();
  if (validationErrors) {
    return res
      .status(HttpStatusCode.UnprocessableEntity)
      .send(validationErrors);
  }

  const email = req.body.email;

  try {
    await EmailSignin.createEmailSigninToken(email);
    return res.status(HttpStatusCode.OK).json({
      email,
      message: `We just emailed a confirmation link to ${email}. Click the link, and you’ll be signed in.`
    });
  } catch (err) {
    logger.error('API failed to register an email auth job');
    return next(err);
  }
};

export const getValidateEmailSigninToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.assert('token', 'Token is not valid').isString();

  const validationErrors = req.validationErrors();
  if (validationErrors) {
    res.status(HttpStatusCode.UnprocessableEntity).send(validationErrors);
  }

  const token = req.query.token;

  EmailSignin.validateEmailSigninToken(token)
    .then((emailSigninModel: EmailSigninModel) => {
      return res.status(HttpStatusCode.OK).json({
        email: emailSigninModel.email,
        message: 'Token is valid and is now deleted from the db.'
      });
    })
    .catch(EmailSigninModel.NotFoundError, function emailSigninNotFound() {
      logger.info(`EmailSignin token not found`, { token });
      return res.status(HttpStatusCode.Unauthorized).json({
        message: `No email signin token found. Please sign in again.`
      });
    })
    .catch(EmailSigninModel.TokenExpiredError, function tokenExpiredError(err) {
      logger.info(`EmailSignin token expired`, { token }, err);
      return res.status(HttpStatusCode.NotFound).json({
        message: 'Your email signin expired. Please sign in again.'
      });
    })
    .catch(function errorValidatingEmailSigninToken(err: any) {
      logger.error(`EmailSignin validation failed.`, { token }, err);
      return next(err);
    });
};
