import React from 'react';
import ReactDOM from 'react-dom';

import UserSession from '../shared/contract/UserSession';
import HttpStatusCode from '../shared/http-status-codes';
import App from '../shared/react/components/App';

interface Window {
  __bootstrapData: any;
}

const bootstrapData: { userSession: UserSession } = (window as any)
  .__bootstrapData;

fetch('/api/me/projects', {
  method: 'POST',
  headers: {
    Credentials: 'same-origin',
    Authorization: `bearer ${bootstrapData.userSession.authToken}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title: 'Project created from client' })
})
  .then(res => res.json())
  .then(json => {
    if (json.status >= 400 || json.error) {
      throw json;
    } else {
      return json;
    }
  })
  .then(json => {
    console.log('fetch response', json);
  })
  .catch(response => {
    console.error('fetch response error', response);
    if (
      response.error &&
      response.error.status == HttpStatusCode.Unauthorized
    ) {
      alert('You are not authorized and need to log in again.');
    }
  });

ReactDOM.hydrate(
  <App email={bootstrapData.userSession.user.email} />,
  document.getElementById('root') as HTMLElement
);
