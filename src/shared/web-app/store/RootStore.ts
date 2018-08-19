import ProjectsStore, { ProjectsStoreState } from './ProjectsStore';
import PublicUserProfileStore from './PublicUserProfileStore';
import UIStore, { UIStoreState } from './UIStore';
import UserStore, { UserStoreState } from './UserStore';

export interface StoreState {
  uiStore: UIStoreState;
  userStore: UserStoreState;
  projectsStore?: ProjectsStoreState;
  publicUserProfileStore?: PublicUserProfileStore;
}

export default class RootStore {
  public uiStore: UIStore;
  public userStore: UserStore;
  public projectsStore: ProjectsStore;
  public publicUserProfileStore: PublicUserProfileStore;

  private constructor(
    uiStore: UIStore,
    userStore: UserStore,
    projectsStore: ProjectsStore,
    publicUserProfileStore: PublicUserProfileStore
  ) {
    this.uiStore = uiStore;
    this.userStore = userStore;
    this.projectsStore = projectsStore;
    this.publicUserProfileStore = publicUserProfileStore;
  }

  static rehydrate(state: StoreState): RootStore {
    return new RootStore(
      new UIStore(state.uiStore),
      new UserStore(state.userStore),
      new ProjectsStore(state.projectsStore),
      new PublicUserProfileStore(state.publicUserProfileStore)
    );
  }
}
