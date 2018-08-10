import { UserModel } from '../../server/db/models';

export class UserSession {
  constructor(
    public readonly user: UserModel,
    public readonly authToken: string
  ) {}
}
