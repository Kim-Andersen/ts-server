import { IActions } from '../web-app/actions';
import RootStore from '../web-app/store/RootStore';

export default interface FetchInitialDataOptions {
  params: any;
  rootStore: RootStore;
  actions: IActions;
}
