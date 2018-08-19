import { observable } from 'mobx';

export interface UserStoreState {
  userId: number;
  email: string;
}

export default class UIStateStore {
  public readonly userId: number;

  @observable
  public email: string;

  constructor(state: UserStoreState) {
    this.userId = state.userId;
    this.email = state.email;
  }
}
