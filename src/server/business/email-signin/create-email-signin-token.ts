import { EmailSigninModel, UserModel } from '../../db/models';
import logger from '../../util/logger';
import { JobDescription, JobPriority, JobType, queue } from '../../util/queue';
import { createEmailSigninMailMessage } from './createEmailSigninMailMessage';

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
          userId: user.id,
          email,
          token: EmailSigninModel.generateRandomToken()
        })
          .save()
          .then(emailSigninModel => {
            return { user, emailSigninModel };
          })
      )

      // Queue job to send out email with signin token.
      .then(combined =>
        queue
          .create(
            new JobDescription(
              JobType.SendMailMessage,
              JobPriority.High,
              3,
              createEmailSigninMailMessage(
                combined.user,
                combined.emailSigninModel
              )
            )
          )
          .then(() => combined.emailSigninModel)
      )
  );
}
