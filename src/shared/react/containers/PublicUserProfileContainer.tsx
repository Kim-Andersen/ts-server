import { inject, observer } from 'mobx-react';
import React from 'react';
import { match } from 'react-router';
import { Link } from 'react-router-dom';

import FetchInitialDataOptions from '../../contract/FetchInitialDataOptions';
import RootStore from '../../web-app/store/RootStore';
import PublicUserProfile from '../components/PublicUserProfile';

interface MatchParams {
  slug: string;
}

export interface Props {
  match: match<MatchParams>;
  rootStore: RootStore;
}

@inject('rootStore')
@observer
class PublicUserProfileContainer extends React.Component<Props> {
  render(): JSX.Element {
    console.log(this.props);
    const { publicUserProfileStore } = this.props.rootStore;
    const { slug } = this.props.match.params;

    let content: JSX.Element;
    if (publicUserProfileStore.loading === true) {
      content = <div>Loading...</div>;
    } else if (!publicUserProfileStore.user) {
      content = (
        <div>
          Sorry, <span style={{ fontWeight: 900 }}>@{slug}</span> is not here
          yet.
          <div style={{ marginTop: 15 }}>
            <Link to="/@kim-andersen">@Kim-Andersen</Link>
          </div>
        </div>
      );
    } else {
      content = (
        <PublicUserProfile
          user={publicUserProfileStore.user}
          projects={publicUserProfileStore.projects}
        />
      );
    }

    return (
      <div style={{ padding: 30 }}>
        <h3>PublicUserProfileContainer</h3>
        {content}
      </div>
    );
  }

  componentDidUpdate(prevProps: Props, prevState: Props) {
    if (
      prevProps.match.params.slug !== this.props.match.params.slug &&
      this.props.rootStore.publicUserProfileStore.loading === false
    ) {
      this.props.rootStore.publicUserProfileStore.fetch(
        this.props.match.params.slug
      );
    }
  }

  // componentDidMount() {
  //   this.props.rootStore.publicUserProfileStore.fetch(
  //     this.props.match.params.slug
  //   );
  // }

  static fetchInitialData({
    params,
    rootStore,
    actions
  }: FetchInitialDataOptions): Promise<any> {
    console.log(`PublicUserProfileContainer.fetchInitialData`, {
      params
    });

    return Promise.all([rootStore.publicUserProfileStore.fetch(params.slug)]);
  }
}

export default PublicUserProfileContainer;
