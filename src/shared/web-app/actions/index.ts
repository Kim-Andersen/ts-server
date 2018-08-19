import RootStore from '../store/RootStore';

export interface IActions {
  fetchUserProfileBySlug: (rootStore: RootStore, slug: string) => Promise<any>;
  // fetchMyProjects: (rootStore: RootStore) => Promise<any>;
}

class Actions implements IActions {
  public fetchUserProfileBySlug(
    rootStore: RootStore,
    slug: string
  ): Promise<any> {
    console.log('actions.fetchUserProfileBySlug', slug);
    return Promise.resolve({ user: { fullName: 'Claus Riskjær' } });
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
