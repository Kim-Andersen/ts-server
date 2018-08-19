import { action, observable, runInAction } from 'mobx';

import api from '../../api';
import { PublicProject } from '../../contract/PublicProject';

export interface PublicUserProfileStoreState {
  user?: any;
  projects?: PublicProject[];
}

export default class PublicUserProfileStore {
  @observable
  user?: any;
  @observable
  projects?: PublicProject[];
  @observable
  loading: boolean;

  constructor(state?: PublicUserProfileStoreState) {
    this.user = (state && state.user) || undefined;
    this.projects = (state && state.projects) || undefined;
    this.loading = false;
  }

  @action
  public fetch(slug: string): Promise<any> {
    this.loading = true;
    return api
      .query(
        `{
          user(slug:"${slug}") {
            id, email, slug
          }
          projects(userId: ${1}) {
            id, title, description
          }
        }
      `
      )
      .then((data: { user?: any; projects?: PublicProject[] }) => {
        return runInAction(() => {
          this.loading = false;
          this.user = data.user;
          this.projects = data.projects;
          return this;
        });
      })
      .catch(err => {
        console.error(`Failed to fetch user by slug "${slug}".`, err);
        runInAction(() => {
          this.loading = false;
        });
      });
  }
}
