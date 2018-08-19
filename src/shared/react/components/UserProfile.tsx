import { inject, observer } from 'mobx-react';
import React from 'react';
import { match } from 'react-router';

import actions, { IActions } from '../../web-app/actions';
import RootStore from '../../web-app/store/RootStore';

interface MatchParams {
  slug: string;
}

export interface Props {
  match: match<MatchParams>;
  rootStore: RootStore;
}

@inject('rootStore')
@observer
class UserProfile extends React.Component<Props> {
  render(): JSX.Element {
    console.log(`UserProfile.render props`, this.props.rootStore);

    const { rootStore, match } = this.props;

    return (
      <div>
        <label>{rootStore.note}</label>
        <h5>user profile for slug "{match.params.slug}"</h5>
        <h1>{rootStore.userStore.email}</h1>

        {this.props.rootStore.projectsStore.projects.map((project, idx) => (
          <label key={idx}>{project.title}</label>
        ))}
      </div>
    );
  }

  static fetchInitialData({
    params,
    rootStore,
    actions
  }: FetchInitialDataOptions): Promise<any> {
    console.log(`UserProfile.fetchInitialData`, {
      params
    });

    return Promise.all([
      actions.fetchUserProfileBySlug(rootStore, params.slug),
      rootStore.projectsStore.fetch()
    ]);
  }
}

interface FetchInitialDataOptions {
  params: any;
  rootStore: RootStore;
  actions: IActions;
}

export default UserProfile;
