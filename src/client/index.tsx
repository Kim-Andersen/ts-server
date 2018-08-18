import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import UserSession from '../shared/contract/UserSession';
import App from '../shared/react/components/App';

// import { graphql } from '../shared/api';
interface Window {
  __bootstrapData: any;
}

const bootstrapData: { userSession: UserSession } = (window as any)
  .__bootstrapData;
console.log('bootstrapData', bootstrapData);

// graphql(
//   `
//     {
//       projects {
//         id
//         title
//       }
//     }
//   `,
//   bootstrapData.userSession.authToken
// ).then(data => console.log(data));

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
