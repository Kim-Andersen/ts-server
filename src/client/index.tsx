import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import UserSession from '../shared/contract/UserSession';
import HttpStatusCode from '../shared/http-status-codes';
import Router from '../shared/react/Router';

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

const { user } = bootstrapData.userSession;

// const userProfile: IUserProfile = {
//   userId: user.id,
//   email: user.email,
//   firstName: 'John',
//   lastName: 'Doe',
//   fullName: 'John Doe'
// };

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
  <BrowserRouter>
    <div>
      <Router />
    </div>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
