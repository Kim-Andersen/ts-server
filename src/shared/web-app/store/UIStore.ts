import { observable } from 'mobx';

export interface Session {
  apiJWT: string;
}

export interface UIStoreState {
  host: string;
  session: Session;
}

export default class UIStateStore {
  public readonly host: string;
  @observable
  session: Session;

  constructor(state: UIStoreState) {
    this.host = state.host;
    this.session = state.session;
  }
}
