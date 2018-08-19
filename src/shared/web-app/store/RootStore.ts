import { observable } from 'mobx';

import ProjectsStore, { ProjectsStoreState } from './ProjectsStore';
import UIStore, { UIStoreState } from './UIStore';
import UserStore, { UserStoreState } from './UserStore';

export interface StoreState {
  uiStore: UIStoreState;
  userStore: UserStoreState;
  projectsStore: ProjectsStoreState;
}

export default class RootStore {
  public uiStore: UIStore;
  public userStore: UserStore;
  public projectsStore: ProjectsStore;

  @observable
  note = 'Hello';

  private constructor(
    uiStore: UIStore,
    userStore: UserStore,
    projectsStore: ProjectsStore
  ) {
    this.uiStore = uiStore;
    this.userStore = userStore;
    this.projectsStore = projectsStore;
  }

  static rehydrate(state: StoreState): RootStore {
    return new RootStore(
      new UIStore(state.uiStore),
      new UserStore(state.userStore),
      new ProjectsStore(state.projectsStore)
    );
  }
}
