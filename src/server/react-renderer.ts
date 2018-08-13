import { Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Hello from '../shared/react/components/App';

const html = ({ body }: { body: string }) => `
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body style="margin:0">
    <div id="root">${body}</div>
  </body>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script defer src="js/client.js" defer></script>
</html>
`;

export default function reactRenderer(req: Request, res: Response) {
  const body = renderToString(
    React.createElement(Hello, {
      name: 'TypeScript',
      enthusiasmLevel: 10
    })
  );

  res.send(
    html({
      body
    })
  );
}
