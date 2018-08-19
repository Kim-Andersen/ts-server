import { onError as onMobXError, Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import api from '../shared/api';
import App from '../shared/react/components/App';
import RootStore from '../shared/web-app/store/RootStore';

interface Window {
  __bootstrapData: any;
}

const bootstrapState = (window as any).__bootstrapState;
console.log('bootstrapState', bootstrapState);

onMobXError(error => console.error(`MobX error`, error));

const rootStore: RootStore = RootStore.rehydrate(bootstrapState);

api.configure({
  baseURL: rootStore.uiStore.host,
  JWT: rootStore.uiStore.session.apiJWT,
  graphqlApiURL: rootStore.uiStore.graphqlApiURL
});

ReactDOM.hydrate(
  <BrowserRouter>
    <Provider rootStore={rootStore}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
