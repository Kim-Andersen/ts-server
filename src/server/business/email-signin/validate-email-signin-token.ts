import { EmailSigninModel } from '../../db/models';
import logger from '../../util/logger';

function hasExpired(expiresAt: Date): boolean {
  return expiresAt <= new Date();
}

export default async function validateEmailSigninToken(
  token: string
): Promise<EmailSigninModel> {
  if (!token) throw Error('token is required');
  logger.info(`Validating EmailSignin token ${token}.`);

  return new Promise<EmailSigninModel>(async (resolve, reject) => {
    // Fetch and validate the db entry.
    try {
      const emailSigninToken = await new EmailSigninModel().fetchByToken(token);

      if (!emailSigninToken) {
        logger.info(`EmailSignin not found for token ${token}.`);
        resolve();
      } else {
        // Delete the entry.
        await emailSigninToken.destroy();

        if (emailSigninToken.isValid()) {
          logger.info(`Valid EmailSignin found for token ${token}.`);
          return resolve(emailSigninToken);
        } else {
          logger.info(`EmailSignin expired for token ${token}.`);
          return resolve();
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
