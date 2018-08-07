export enum QueueJobType {
  WelcomeHome = 'Welcome Home'
}

export interface QueueJob {
  type: QueueJobType;
  data?: any;
}
