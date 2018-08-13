import Promise from 'bluebird';

import UserSession from '../../../shared/contract/UserSession';
import { UserModel } from '../../db/models';
import EmailSigninModel from '../../db/models/email-signin';
import logger from '../../util/logger';

export default function createUserSessionFromToken(
  token: string
): Promise<UserSession> {
  if (!token) throw Error('token is required');

  logger.info(`Creating a user session from token ${token}`);

  return (
    // Fetch the EmailSignin record.
    new EmailSigninModel()
      .where({ token })
      .fetch({ require: true })
      // Check if it's still valid.
      .then((emailSigninModel: EmailSigninModel) => {
        if (emailSigninModel.isValid()) {
          return emailSigninModel;
        } else {
          throw EmailSigninModel.TokenExpiredError;
        }
      })
      // Fetch the associated user.
      .then((emailSigninModel: EmailSigninModel) =>
        emailSigninModel.user().fetch({ require: true })
      )
      // Finally return a new UserSession.
      .then((user: UserModel) => new UserSession(user))
  );
}
