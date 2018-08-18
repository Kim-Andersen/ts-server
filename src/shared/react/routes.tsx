import * as React from 'react';

import UserProfile from './components/UserProfile';

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
    component: UserProfile
  }
];

export default routes;
