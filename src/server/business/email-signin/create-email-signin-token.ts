import { EmailSigninModel, UserModel } from '../../db/models';
import logger from '../../util/logger';
import { queue, QueueJobType } from '../../util/queue';

function createSendEmailSigninJob(emailSigninModel: EmailSigninModel) {
  return queue
    .create(QueueJobType.SendEmailSigninMail, {
      userId: emailSigninModel.userId
    })
    .then(() => emailSigninModel);
}

export default async function createEmailSigninToken(
  email: string
): Promise<EmailSigninModel> {
  if (!email) throw Error('email is required');
  logger.info(`Created EmailSignin for ${email}`);

  return (
    // Fetch user with this email address.
    new UserModel()
      .where({ email })
      .fetch({ require: false })

      // Create new user if not found.
      .then((user: UserModel) => user || new UserModel({ email }).save())

      // Delete any existing email signin record for this user.
      .then(user =>
        new EmailSigninModel()
          .where({ email })
          .destroy({ require: false })
          .then(() => user)
      )

      // Create new email signin record.
      .then(user =>
        new EmailSigninModel({
          user_id: user.id,
          email,
          token: EmailSigninModel.generateRandomToken()
        }).save()
      )

      // Create queue job to send out email with signin token.
      .then(createSendEmailSigninJob)
  );
}
