import api from '../../api';

export interface IActions {
  fetchUserProfileBySlug: (slug: string) => Promise<any>;
  // fetchMyProjects: (rootStore: RootStore) => Promise<any>;
}

class Actions implements IActions {
  public fetchUserProfileBySlug(slug: string): Promise<any> {
    console.log('actions.fetchUserProfileBySlug', slug);
    return api
      .query(`{ user(slug:"${slug}") { id, email, slug } }`)
      .then(user => console.log('user', user));
  }

  // public fetchMyProjects(rootStore: RootStore): Promise<any> {
  //   return api
  //     .query(
  //       `
  //       {
  //         projects {
  //           id
  //           title
  //         }
  //       }
  //     `
  //     )
  //     .then(projects => {
  //       rootStore.projectsStore.projects.push(projects);
  //       return projects;
  //     });
  // }
}

export default new Actions();
