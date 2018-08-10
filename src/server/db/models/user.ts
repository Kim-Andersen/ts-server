import bookshelf from '../bookshelf';
import EmailSigninModel from './email-signin';

export default class UserModel extends bookshelf.Model<UserModel> {
  get tableName() {
    return 'user';
  }
  get hasTimestamps() {
    return true;
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
    return this.get('last_login_at');
  }
  public set lastLoginAt(last_login_at: Date) {
    this.set({ last_login_at });
  }

  public get createdAt(): Date {
    return this.get('created_at');
  }

  public get updatedAt(): Date {
    return this.get('updated_at');
  }

  public generateAuthToken(): string {
    // TODO: Generate some auth token.
    return 'blaaaaaaaaaaaaaaaaah';
  }
}
