import jwt from 'jsonwebtoken';

import { SESSION_SECRET } from '../../util/env';
import bookshelf from '../bookshelf';
import EmailSigninModel from './email-signin';

export default class UserModel extends bookshelf.Model<UserModel> {
  get tableName() {
    return 'user';
  }
  get hasTimestamps() {
    // Rverride the default attribute names.
    return ['createdAt', 'updatedAt'];
  }

  public emailSignin() {
    return this.hasOne(EmailSigninModel);
  }

  public get email(): string {
    return this.get('email');
  }
  public set email(email: string) {
    this.set({ email });
  }

  public get lastLoginAt(): Date {
    return this.get('lastLoginAt');
  }
  public set lastLoginAt(lastLoginAt: Date) {
    this.set({ lastLoginAt });
  }

  public get createdAt(): Date {
    return this.get('createdAt');
  }

  public get updatedAt(): Date {
    return this.get('updatedAt');
  }

  public generateJSONWebToken(): string {
    return jwt.sign(this.toJSON(), SESSION_SECRET);
  }
}
