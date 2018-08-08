import { Job } from 'kue';

import queueJob from '../../../util/queue/jobs';
import queueManager from '../../../util/queue/queue-manager';

class EmailAuthenticator {
  public async signin(email: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // 1. Register email in db.
      // ...
      // throw Error('DB blew up!');

      // 2. Create job to send out mail.
      const job: Job = queueManager
        .create(new queueJob.WelcomeHome({ email }))
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
