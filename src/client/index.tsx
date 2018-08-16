import React from 'react';
import ReactDOM from 'react-dom';

import UserSession from '../shared/contract/UserSession';
import HttpStatusCode from '../shared/http-status-codes';
import App from '../shared/react/components/App';

interface Window {
  __bootstrapData: any;
}

function graphql(query: string, authToken: string): Promise<any> {
  return fetch('/api/graphql', {
    method: 'POST',
    headers: {
      Credentials: 'same-origin',
      Authorization: `bearer ${authToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: ` ${query}`
    })
  })
    .then(res => {
      if (res.ok) {
        return res;
      } else {
        throw Error(`Invalid url ${res.url}: ${res.status}`);
      }
    })
    .then(res => res.json())
    .then(json => {
      if (json.status >= 400 || json.error) {
        throw json;
      } else {
        return json;
      }
    })
    .then(json => json.data)
    .catch(response => {
      console.error('fetch response error', response);
      if (
        response.error &&
        response.error.status == HttpStatusCode.Unauthorized
      ) {
        alert('You are not authorized and need to log in again.');
      }
    });
}

const bootstrapData: { userSession: UserSession } = (window as any)
  .__bootstrapData;

graphql(
  `
    {
      projects {
        id
        title
      }
    }
  `,
  bootstrapData.userSession.authToken
).then(data => console.log(data));

ReactDOM.hydrate(
  <App email={bootstrapData.userSession.user.email} />,
  document.getElementById('root') as HTMLElement
);
