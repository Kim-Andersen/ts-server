import url from 'url';

import { EMAIL_SIGNIN_TOKEN_TIMEOUT_MINUTES } from '../../../shared/config';
import { EmailSigninModel, UserModel } from '../../db/models';
import { ROOT_URL } from '../../util/env';
import { MailMessage } from '../../util/mail';

export function createEmailSigninMailMessage(
  user: UserModel,
  emailSignin: EmailSigninModel
): MailMessage {
  const signInUrl = new url.URL(
    `/callback/email?token=${emailSignin.token}`,
    ROOT_URL
  );
  const html = `
    <p>Click the link below to sign in to your account.<p/>
    <p>This link will expire in ${EMAIL_SIGNIN_TOKEN_TIMEOUT_MINUTES} minutes.</p>
      <a href="${signInUrl}">Sign in to ${ROOT_URL}</a>
    `;

  return new MailMessage(
    user.email,
    user.email,
    `Sign in to ${ROOT_URL}`,
    undefined,
    html
  );
}
