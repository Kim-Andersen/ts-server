import React from 'react';
import ReactDOM from 'react-dom';

import UserSession from '../shared/contract/UserSession';
import App from '../shared/react/components/App';

const bootstrapData: { userSession: UserSession } = window['__bootstrapData'];

ReactDOM.hydrate(
  <App email={bootstrapData.userSession.user.email} />,
  document.getElementById('root') as HTMLElement
);
