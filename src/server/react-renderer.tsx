import { NextFunction, Request, Response } from 'express';
import { Provider, useStaticRendering } from 'mobx-react';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { matchPath } from 'react-router-dom';
import serialize from 'serialize-javascript';

import UserSession from '../shared/contract/UserSession';
import App from '../shared/react/components/App';
import routes from '../shared/react/routes';
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
  logger.info(`reactRenderer url: ${req.url}`);

  if (!req.session || !req.session.userSession) {
    return res.redirect('/login');
  }

  const userSession: UserSession = req.session.userSession;

  const activeRoute = routes.find(route => matchPath(req.url, route) !== null);

  console.log('activeRoute', activeRoute);

  const initialDataPromise =
    activeRoute && activeRoute.component.fetchInitialData
      ? activeRoute.component.fetchInitialData()
      : Promise.resolve();

  initialDataPromise
    .then((data: any) => {
      const staticContext: StaticRouterContext = {};

      const storeState: StoreState = {
        uiStore: {
          host: ROOT_URL,
          session: {
            apiJWT: userSession.authToken
          }
        },
        userStore: {
          userId: userSession.user.id,
          email: userSession.user.email
        }
      };

      const markup = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={staticContext}>
          <Provider rootStore={RootStore.rehydrate(storeState)}>
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
              bootstrapData: serialize(storeState, {
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
