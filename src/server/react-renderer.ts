import { Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../client/components/App';

const html = ({ body }: { body: string }) => `
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body style="margin:0">
    <div id="app">${body}</div>
  </body>
  <script src="js/client.js" defer></script>
</html>
`;

export default function reactRenderer(req: Request, res: Response) {
  const body = renderToString(React.createElement(App));

  res.send(
    html({
      body
    })
  );
}
