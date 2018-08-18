import { observable } from 'mobx';

import UIStore, { UIStoreState } from './UIStore';
import UserStore, { UserStoreState } from './UserStore';

export interface StoreState {
  uiStore: UIStoreState;
  userStore: UserStoreState;
}

export default class RootStore {
  public uiState: UIStore;
  public userStore: UserStore;

  @observable
  note = 'Hello';

  private constructor(uiStore: UIStore, userStore: UserStore) {
    this.uiState = uiStore;
    this.userStore = userStore;
  }

  static rehydrate(state: StoreState): RootStore {
    return new RootStore(
      new UIStore(state.uiStore),
      new UserStore(state.userStore)
    );
  }
}
