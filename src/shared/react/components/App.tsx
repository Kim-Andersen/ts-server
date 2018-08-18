import * as React from 'react';
import { Route, Switch } from 'react-router';

import routes from '../routes';

// import { Button, Dropdown, Input } from 'semantic-ui-react';

const RouteWithSubRoutes = (route: any) => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

export interface Props {
  // email: string;
}

// const friendOptions = [
//   {
//     text: 'Jenny Hess',
//     value: 'Jenny Hess',
//     image: { avatar: true, src: '/images/avatar/small/jenny.jpg' }
//   }
// ];

export default function App({  }: Props) {
  return (
    <div>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
}
