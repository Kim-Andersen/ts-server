import crypto from 'crypto';
import moment from 'moment';

import { EMAIL_SIGNIN_TOKEN_TIMEOUT_MINUTES } from '../../../shared/config';
import bookshelf from '../bookshelf';
import UserModel from './user';

export default class EmailSigninModel extends bookshelf.Model<
  EmailSigninModel
> {
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

  public user() {
    return this.belongsTo(UserModel);
  }

  get tableName() {
    return 'email_signin';
  }
  get hasTimestamps() {
    // Rverride the default attribute names.
    return ['createdAt', 'updatedAt'];
  }

  public get userId(): number {
    return this.get('userId');
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
    return this.get('createdAt');
  }
  public set createdAt(created_at: Date) {
    this.set({ created_at });
  }

  public static generateRandomToken(numBytes = 20): string {
    const buffer = crypto.randomBytes(numBytes);
    return buffer.toString('hex');
  }
}
