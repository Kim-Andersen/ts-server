import createEmailSigninToken from './create-email-signin-token';
import createUserSessionFromToken from './createUserSessionFromToken';
import { validateEmailSigninToken } from './validate-email-signin-token';

const EmailSignin = {
  createEmailSigninToken,
  validateEmailSigninToken,
  createUserSessionFromToken
};

export default EmailSignin;
