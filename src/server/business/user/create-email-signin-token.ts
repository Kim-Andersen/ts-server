import crypto from 'crypto';
import moment from 'moment';

import { EMAIL_SIGNIN_TOKEN_TIMEOUT_MINUTES } from '../../../shared/config';
import { EmailSigninToken } from '../../../shared/contract/EmailSigninToken';
import knex from '../../db/knex';
import logger from '../../util/logger';

function generateRandomHexString(numBytes = 20): string {
  const buffer = crypto.randomBytes(numBytes);
  return buffer.toString('hex');
}

export default async function createEmailSigninToken(
  email: string
): Promise<EmailSigninToken> {
  if (!email) throw Error('email is required');

  return new Promise<EmailSigninToken>(async (resolve, reject) => {
    // Delete any existing entries for this email address.
    try {
      await knex('email_signin')
        .where({ email })
        .del();
    } catch (error) {
      logger.error(
        `Failed to delete any existing email_signin entry for ${email}.`,
        error
      );
      return reject(error);
    }

    // Add new entry to DB.
    const token = generateRandomHexString();
    const expiresAt = moment()
      .add(EMAIL_SIGNIN_TOKEN_TIMEOUT_MINUTES, 'minutes')
      .toDate(); // Token expires in 15 minutes.

    try {
      const emailSigninToken = await knex('email_signin')
        .returning(['email', 'token', 'expiresAt'])
        .insert({
          email,
          token,
          expiresAt
        });
      return resolve(emailSigninToken);
    } catch (error) {
      logger.error(
        `Failed to insert new email_signin entry for ${email}.`,
        error
      );
      return reject(error);
    }
  });
}
