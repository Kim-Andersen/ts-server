import { EmailSigninToken } from '../../../../shared/contract/EmailSigninToken';
import logger from '../../../util/logger';
import { queue, queueJob } from '../../../util/queue';
import User from '../../user';

// import queueManager from '../../../util/queue/queue-manager';
class EmailAuthenticator {
  public async signin(email: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 1. Register email in db.
      let emailSigninToken: EmailSigninToken;
      try {
        emailSigninToken = await User.createEmailSigninToken(email);
      } catch (error) {
        logger.error(
          `Failed to create an email signin token for ${email}.`,
          error
        );
        return reject(error);
      }

      // 2. Create job to send out mail.
      queue
        .create(new queueJob.sendEmailSigninMail(emailSigninToken))
        .save((err: any) => {
          if (!err) {
            resolve(true);
          } else {
            logger.error(
              `Failed to create sendEmailSigninMail job for ${email}.`,
              err
            );
            reject(err);
          }
        });
    });
  }
}

export default new EmailAuthenticator();
