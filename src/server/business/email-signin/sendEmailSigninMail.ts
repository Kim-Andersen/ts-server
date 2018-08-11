import Promise from 'bluebird';
import url from 'url';

import { EmailSigninModel, UserModel } from '../../db/models';
import { ROOT_URL } from '../../util/env';
import logger from '../../util/logger';
import { mailer, MailMessage } from '../../util/mail';

function _sendMail(
  user: UserModel,
  emailSignin: EmailSigninModel
): Promise<any> {
  logger.debug(
    `sendEmailSigninMail: sending mail to ${user.email} with login token ${
      emailSignin.token
    }`
  );

  const signInUrl = new url.URL(
    `/callback/email?token=${emailSignin.token}`,
    ROOT_URL
  );
  const html = `
    <a href="${signInUrl}">Sign in to [site name]</a>
  `;

  return mailer.send(
    new MailMessage(
      user.email,
      user.email,
      'Sign in to [site name]',
      undefined,
      html
    )
  );
}

export default function sendEmailSigninMail(user_id: number): Promise<any> {
  logger.info(`sendEmailSigninMail: for user_id ${user_id}`);

  return new EmailSigninModel()
    .where({ user_id })
    .fetch({ require: true })
    .then((emailSignin: EmailSigninModel) => {
      logger.debug(
        `sendEmailSigninMail: found emailSignin for for user_id ${user_id}`,
        emailSignin
      );
      return emailSignin
        .user()
        .fetch({ require: true })
        .then(user => _sendMail(user, emailSignin));
    });
}
