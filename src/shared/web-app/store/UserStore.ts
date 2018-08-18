import { observable } from 'mobx';

export interface UserStoreState {
  userId: number;
  email: string;
}

// import UserSession from '../../contract/UserSession';
export default class UIStateStore {
  public readonly userId: number;

  @observable
  public email: string;

  constructor(state: UserStoreState) {
    this.userId = state.userId;
    this.email = state.email;
  }

  // @observable
  // public session?: UserSession;
}
