import * as React from 'react';

import PublicUserProfileContainer from './containers/PublicUserProfileContainer';

const Home = () => <h1>Home</h1>;

export interface IRouteConfig {
  path: string;
  exact?: boolean;
  component: any;
}

const routes: IRouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/@:slug',
    exact: true,
    component: PublicUserProfileContainer
  }
];

export default routes;
