import { NextFunction, Request, Response } from 'express';

import { emailAuthenticator } from '../../business/auth/email';
import User from '../../business/user';
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
    return res.status(400).send(validationErrors);
  }

  const email = req.body.email;

  let result: boolean;
  try {
    result = await emailAuthenticator.signin(email);
  } catch (err) {
    logger.error('API failed to register an email auth job');
    return next(err);
  }

  if (result === true) {
    return res.status(200).json({
      email,
      message: `We just emailed a confirmation link to ${email}. Click the link, and you’ll be signed in.`
    });
  } else {
    return res.status(400).send({ error: '' });
  }
};

export const getValidateEmailSigninToken = async (
  req: Request,
  res: Response
) => {
  req.assert('token', 'Token is not valid').isString();

  const validationErrors = req.validationErrors();
  if (validationErrors) {
    return res.status(400).send(validationErrors);
  }

  const token = req.query.token;
  const emailSigninToken = await User.validateEmailSigninToken(token);

  if (emailSigninToken) {
    return res.status(200).json({
      email: emailSigninToken.email,
      message: 'Token is valid and is now deleted from the db.'
    });
  } else {
    return res.status(401).json({
      message: 'Token has expiried or is invalid. Please log in again.'
    });
  }
};
