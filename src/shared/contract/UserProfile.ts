import { UserModel } from '../../server/db/models';

export interface IUserProfile {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
}

export class UserProfile implements IUserProfile {
  public readonly userId: number;
  public readonly email: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly fullName: string;

  constructor(userModel: UserModel) {
    this.userId = userModel.id;
    this.email = userModel.email;
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
