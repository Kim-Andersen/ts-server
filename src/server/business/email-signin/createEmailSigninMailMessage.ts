import url from 'url';

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
      <a href="${signInUrl}">Sign in to [site name]</a>
    `;

  return new MailMessage(
    user.email,
    user.email,
    'Sign in to [site name]',
    undefined,
    html
  );
}
