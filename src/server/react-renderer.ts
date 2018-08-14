import { Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import UserSession from '../shared/contract/UserSession';
import App from '../shared/react/components/App';
import logger from './util/logger';

const html = ({
  body,
  bootstrapData
}: {
  body: string;
  bootstrapData: string;
}) => `
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body style="margin:0">
    <div id="root">${body}</div>
  </body>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script defer src="js/client.js" defer></script>

  <script>
    var __bootstrapData = ${bootstrapData};
  </script>
</html>
`;

export default function reactRenderer(req: Request, res: Response) {
  logger.info('reactRenderer: req.session', req.session);

  if (!req.session || !req.session.userSession) {
    return res.redirect('/login');
  }

  const userSession: UserSession = req.session.userSession;

  const body = renderToString(
    React.createElement(App, {
      email: userSession.user.email
    })
  );

  res.send(
    html({
      body,
      bootstrapData: JSON.stringify({ userSession })
    })
  );
}
