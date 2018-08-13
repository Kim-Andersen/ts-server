import { UserModel } from '../../server/db/models';

export class UserSession {
  public readonly authToken: string;
  constructor(public readonly user: UserModel) {
    this.authToken = user.generateJSONWebToken();
  }
}
