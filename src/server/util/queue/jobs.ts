import { EmailSigninToken } from '../../business/user/user';
import { QueueJob, QueueJobType } from './types';

class SendEmailSigninMail implements QueueJob {
  public readonly type: QueueJobType = QueueJobType.SendEmailSigninMail;
  constructor(public readonly data: EmailSigninToken) {}
}

const queueJob = {
  sendEmailSigninMail: SendEmailSigninMail
};

export default queueJob;
