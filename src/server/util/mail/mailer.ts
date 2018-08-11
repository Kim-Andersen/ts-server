import sgMail from '@sendgrid/mail';
import Promise from 'bluebird';

import { SENDGRID_API_KEY } from '../env';
import logger from '../logger';
import MailMessage from './MailMessage';

sgMail.setApiKey(SENDGRID_API_KEY);

const Mailer = {
  send: Promise.method(function(message: MailMessage) {
    logger.info(`MailSender sending mail to ${message.to}`);
    const { to, from, subject, text, html } = message;
    return sgMail.send({ to, from, subject, text, html });
  })
};

export default Mailer;
