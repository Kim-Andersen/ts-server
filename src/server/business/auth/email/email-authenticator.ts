import { queue, queueJob } from '../../../util/queue';
import { User } from '../../user';

// import queueManager from '../../../util/queue/queue-manager';
class EmailAuthenticator {
  public async signin(email: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 1. Register email in db.
      const emailSigninToken = await User.createEmailSigninToken(email);
      // throw Error('DB blew up!');

      // 2. Create job to send out mail.
      queue
        .create(new queueJob.sendEmailSigninMail(emailSigninToken))
        .save((err: any) => {
          if (!err) {
            resolve(true);
          } else {
            reject();
          }
        });
    });
  }
}

export default new EmailAuthenticator();
