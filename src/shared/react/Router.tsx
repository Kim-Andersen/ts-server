import React from 'react';
import { Route, Switch } from 'react-router';

import App from './components/App';
import NotFound from './components/NotFound';
import UserProfile from './components/UserProfile';

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path={`/@:slug`} component={UserProfile} />
      <Route component={NotFound} />
    </Switch>
  );
}
