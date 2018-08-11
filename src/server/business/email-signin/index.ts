import createEmailSigninToken from './create-email-signin-token';
import createUserSessionFromToken from './createUserSessionFromToken';
import sendEmailSigninMail from './sendEmailSigninMail';
import { validateEmailSigninToken } from './validate-email-signin-token';

const EmailSignin = {
  createEmailSigninToken,
  validateEmailSigninToken,
  createUserSessionFromToken,
  sendEmailSigninMail
};

export default EmailSignin;
