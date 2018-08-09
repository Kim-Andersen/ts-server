import { EmailSigninToken } from '../../../shared/contract/EmailSigninToken';
import knex from '../../db/knex';
import logger from '../../util/logger';

function hasExpired(expiresAt: Date): boolean {
  return expiresAt <= new Date();
}

export default async function validateEmailSigninToken(
  token: string
): Promise<EmailSigninToken> {
  if (!token) throw Error('token is required');

  return new Promise<EmailSigninToken>(async (resolve, reject) => {
    // Fetch and validate the db entry.
    try {
      const emailSigninToken: EmailSigninToken = await knex
        .first()
        .from('email_signin')
        .where({ token })
        .select('*');

      if (!emailSigninToken) {
        resolve();
      } else {
        // Delete the entry.
        await knex('email_signin')
          .where({ id: emailSigninToken.id })
          .del();

        if (hasExpired(emailSigninToken.expiresAt)) {
          return resolve();
        } else {
          return resolve(emailSigninToken);
        }
      }
    } catch (error) {
      logger.error(
        `Failed to retrieve email_signin db entry for ${token}.`,
        error
      );
      return reject(error);
    }
  });
}
