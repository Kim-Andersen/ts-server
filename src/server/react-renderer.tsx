import { NextFunction, Request, Response } from 'express';
import { Provider, useStaticRendering } from 'mobx-react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { matchPath } from 'react-router-dom';
import serialize from 'serialize-javascript';

import api from '../shared/api';
import UserSession from '../shared/contract/UserSession';
import HttpStatusCode from '../shared/http-status-codes';
import App from '../shared/react/components/App';
import routes from '../shared/react/routes';
import actions from '../shared/web-app/actions';
import RootStore, { StoreState } from '../shared/web-app/store/RootStore';
import { ROOT_URL } from './util/env';
import logger from './util/logger';

// https://github.com/mobxjs/mobx-react#server-side-rendering-with-usestaticrendering
useStaticRendering(true);

export default function reactRenderer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info(`reactRenderer url: ${req.url}`, req.path);

  if (!req.session || !req.session.userSession) {
    return res.redirect('/login');
  }

  const route = routes.find(route => matchPath(req.path, route) !== null);
  const match = route && matchPath(req.path, route);
  console.log('route', route);
  console.log('match', match);

  if (!route || !match) {
    return res.status(HttpStatusCode.NotFound).send('Page not found');
  }

  // Create the state.
  const userSession: UserSession = req.session!.userSession;
  const defaultStoreState: StoreState = {
    uiStore: {
      host: ROOT_URL,
      graphqlApiURL: ROOT_URL + '/api/graphl',
      session: {
        apiJWT: userSession.authToken
      }
    },
    userStore: {
      userId: userSession.user.id,
      email: userSession.user.email
    }
  };
  const rootStore = RootStore.rehydrate(defaultStoreState);

  api.configure({
    baseURL: rootStore.uiStore.host,
    JWT: rootStore.uiStore.session.apiJWT,
    graphqlApiURL: rootStore.uiStore.graphqlApiURL
  });

  // Load any initial data required by the component.
  const initialDataPromise =
    route.component && route.component.fetchInitialData
      ? route.component.fetchInitialData({
          params: match.params,
          rootStore,
          actions
        })
      : Promise.resolve();

  initialDataPromise
    .then(() => {
      const staticContext: StaticRouterContext = {};

      const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={staticContext}>
          <Provider rootStore={rootStore}>
            <App />
          </Provider>
        </StaticRouter>
      );

      if (staticContext.url) {
        res.writeHead(301, {
          Location: staticContext.url
        });
        res.end();
      } else {
        res
          .send(
            renderHTML({
              markup,
              bootstrapData: serialize(rootStore, {
                isJSON: true
              })
            })
          )
          .end();
      }
    })
    .catch(next);
}

const renderHTML = ({
  markup,
  bootstrapData
}: {
  markup: string;
  bootstrapData: string;
}) => `
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body style="margin:0">
    <div id="root">${markup}</div>
  </body>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script defer src="js/client.js" defer></script>

  <script>
    var __bootstrapState = ${bootstrapData};
  </script>
</html>
`;
