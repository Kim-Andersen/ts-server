import { onError as onMobXError, Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '../shared/react/components/App';
import RootStore from '../shared/web-app/store/RootStore';

// import { graphql } from '../shared/api';
interface Window {
  __bootstrapData: any;
}

const bootstrapState = (window as any).__bootstrapState;
console.log('bootstrapState', bootstrapState);

onMobXError(error => console.error(`MobX error`, error));

const rootStore: RootStore = RootStore.rehydrate(bootstrapState);

setTimeout(() => {
  // rootStore.userStore.email = 'sdfdsfsfsd';
  rootStore.note = 'World';
}, 2000);

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
    <Provider rootStore={rootStore}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
