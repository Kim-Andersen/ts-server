import { QueueJob, QueueJobType } from './types';

class WelcomeHomeJob implements QueueJob {
  public readonly type: QueueJobType = QueueJobType.WelcomeHome;
  constructor(public readonly data: { email: string }) {}
}

const queueJob = {
  WelcomeHome: WelcomeHomeJob
};

export default queueJob;
