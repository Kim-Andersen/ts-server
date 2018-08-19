import { autorun, observable } from 'mobx';

import api from '../../api';

export interface ProjectsStoreState {
  projects: Project[];
}

interface Project {
  id: number;
  title: string;
}

// import UserSession from '../../contract/UserSession';
export default class ProjectsStore {
  @observable
  projects: Project[] = [];

  constructor(state: ProjectsStoreState) {
    console.log('ProjectsStore.constructor', state.projects.length);
    this.projects = state.projects;

    autorun(() => {
      console.log('ProjectsStore.projects:', this.projects.length);
    });
  }

  public fetch(): Promise<Project[]> {
    return api
      .query(
        `
      {
        projects {
          id
          title
        }
      }
    `
      )
      .then(({ projects }) => (this.projects = projects));
  }
}
