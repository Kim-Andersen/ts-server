import { EmailSigninModel } from '../../db/models';
import logger from '../../util/logger';
import { queue, QueueJobType } from '../../util/queue';

function createSendEmailJob(emailSigninModel: EmailSigninModel) {
  return queue
    .create(QueueJobType.SendEmailSigninMail, emailSigninModel.toJSON())
    .then(() => emailSigninModel);
}

export default async function createEmailSigninToken(
  email: string
): Promise<EmailSigninModel> {
  if (!email) throw Error('email is required');
  logger.info(`Created EmailSignin for email ${email}`);

  return new EmailSigninModel()
    .where({ email })
    .destroy({ require: false }) // Dont throw if none exists.
    .then(() => {
      return new EmailSigninModel({
        email,
        token: EmailSigninModel.generateRandomToken()
      })
        .save()
        .then(createSendEmailJob);
    });
}
