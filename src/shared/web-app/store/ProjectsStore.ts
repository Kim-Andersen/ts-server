import { autorun, observable, runInAction } from 'mobx';

import api from '../../api';
import { PublicProject } from '../../contract/PublicProject';

export interface ProjectsStoreState {
  projects: PublicProject[];
}

// import UserSession from '../../contract/UserSession';
export default class ProjectsStore {
  @observable
  projects: PublicProject[];

  constructor(state?: ProjectsStoreState) {
    this.projects = (state && state.projects) || [];

    autorun(() => {
      console.log('ProjectsStore.projects:', this.projects.length);
    });
  }

  public fetch(): Promise<PublicProject[]> {
    return api
      .query(
        `
      {
        projects {
          id
          title
          description
        }
      }
    `
      )
      .then(({ projects }) => runInAction(() => (this.projects = projects)));
  }
}
