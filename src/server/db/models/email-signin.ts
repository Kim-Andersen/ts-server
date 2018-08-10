import Promise from 'bluebird';
import crypto from 'crypto';
import moment from 'moment';

import { EMAIL_SIGNIN_TOKEN_TIMEOUT_MINUTES } from '../../../shared/config';
import bookshelf from '../bookshelf';

export class EmailSigninModel extends bookshelf.Model<EmailSigninModel> {
  static TokenExpiredError = Error('Token has expired');
  /**
   * Checks if the token expired.
   */
  public isValid(): boolean {
    return (
      moment.duration(moment().diff(this.createdAt)).asMinutes() <=
      EMAIL_SIGNIN_TOKEN_TIMEOUT_MINUTES
    );
  }

  public fetchByToken(token: string): Promise<EmailSigninModel> {
    return this.where({ token }).fetch({ require: true });
  }

  get tableName() {
    return 'email_signin';
  }
  get hasTimestamps() {
    return true;
  }

  public get email(): string {
    return this.get('email');
  }
  public set email(email: string) {
    this.set({ email });
  }

  public get token(): string {
    return this.get('token');
  }
  public set token(token: string) {
    this.set({ token });
  }

  public get createdAt(): Date {
    return this.get('created_at');
  }
  public set createdAt(created_at: Date) {
    this.set({ created_at });
  }

  public static generateRandomToken(numBytes = 20): string {
    const buffer = crypto.randomBytes(numBytes);
    return buffer.toString('hex');
  }
}
