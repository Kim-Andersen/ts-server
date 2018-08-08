import { Job } from 'kue';

import queueJob from '../../../util/queue/jobs';
import queueManager from '../../../util/queue/queue-manager';
import { User } from '../../user';

class EmailAuthenticator {
  public async signin(email: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      // 1. Register email in db.
      const emailSigninToken = await User.newEmailSignin(email);
      // throw Error('DB blew up!');

      // 2. Create job to send out mail.
      const job: Job = queueManager
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
