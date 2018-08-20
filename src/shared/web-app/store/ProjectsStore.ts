import { action, autorun, observable, runInAction } from 'mobx';

import api from '../../api';
import { PublicProject } from '../../contract/PublicProject';

export interface ProjectsStoreState {
  projects: PublicProject[];
}

export interface ProjectPatch {
  title?: string;
  description?: string;
}

// import UserSession from '../../contract/UserSession';
export default class ProjectsStore {
  @observable
  projects: PublicProject[];

  constructor(state?: ProjectsStoreState) {
    this.projects = (state && state.projects) || [];

    this.patchProject = this.patchProject.bind(this);
    this.addProject = this.addProject.bind(this);

    autorun(() => {
      console.log('ProjectsStore.projects:', this.projects.length);
    });
  }

  @action
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

  @action
  public addProject(title: string, description?: string) {
    return api
      .query(
        `
        mutation {
          addProject(title:"${title}", description:"${description || ''}") {
            id, title, description
          }
        }
      `
      )
      .then(data => data.addProject)
      .then(project => {
        return runInAction(() => {
          this.projects.push(project);
          return project;
        });
      });
  }

  @action
  public patchProject(id: number, patch: ProjectPatch): Promise<PublicProject> {
    return api
      .query(
        `
        mutation {
          patchProject(id:${id},title:"${patch.title}", description:"${
          patch.description
        }") {
            id, title, description
          }
        }
      `
      )
      .then(data => data.patchProject)
      .then(updatedProject => {
        return runInAction(() => {
          let project = this.projects.find(p => p.id == updatedProject.id);
          if (project) {
            project = Object.assign({}, project, updatedProject);
          } else {
            this.projects.push(updatedProject);
          }
          return updatedProject;
        });
      });
  }
}
