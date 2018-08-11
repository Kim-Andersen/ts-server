import Promise from 'bluebird';

import { EmailSigninModel } from '../../db/models';
import logger from '../../util/logger';

function hasExpired(expiresAt: Date): boolean {
  return expiresAt <= new Date();
}

export function validateEmailSigninToken(
  token: string
): Promise<EmailSigninModel> {
  if (!token) throw Error('token is required');
  logger.info(`Validating EmailSignin token.`, { token });

  return new EmailSigninModel()
    .where({ token })
    .fetch({ require: true })
    .then(emailSigninModel => {
      if (emailSigninModel.isValid()) {
        return emailSigninModel;
      } else {
        throw EmailSigninModel.TokenExpiredError;
      }
    });
}
