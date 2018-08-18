import { inject, observer } from 'mobx-react';
import React from 'react';
import { match } from 'react-router';

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
    console.log(`UserProfile.render props`, this.props);
    const { rootStore, match } = this.props;

    return (
      <div>
        <label>{rootStore.note}</label>
        <h5>user profile for slug "{match.params.slug}"</h5>
        <h1>{rootStore.userStore.email}</h1>
      </div>
    );
  }

  // static fetchInitialData(slug: string): Promise<IProfileData> {
  //   console.log(`UserProfile.fetchInitialData...`, { slug });
  //   return Promise.resolve({ user: { fullName: 'Claus Riskjær' } });
  // }
}

export default UserProfile;
