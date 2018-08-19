import { inject, observer } from 'mobx-react';
import React from 'react';
import { match } from 'react-router';

import actions, { IActions } from '../../web-app/actions';
import RootStore from '../../web-app/store/RootStore';
import Project from './Project';

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
      <div style={{ padding: 30 }}>
        <h3>@{match.params.slug}</h3>
        <hr />
        {this.props.rootStore.projectsStore.projects.map(project => (
          <Project project={project} key={project.id} />
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
