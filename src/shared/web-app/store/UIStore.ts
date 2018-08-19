import { observable } from 'mobx';

export interface Session {
  apiJWT: string;
}

export interface UIStoreState {
  host: string;
  graphqlApiURL: string;
  session: Session;
}

export default class UIStateStore {
  public readonly host: string;
  public readonly graphqlApiURL: string;

  @observable
  session: Session;

  constructor(state: UIStoreState) {
    this.host = state.host;
    this.graphqlApiURL = state.graphqlApiURL;
    this.session = state.session;
  }
}
