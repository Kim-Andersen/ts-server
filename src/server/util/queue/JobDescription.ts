import { JobPriority } from './JobPriority';
import { QueueJobType } from './queue-job-type';

export class JobDescription {
  constructor(
    public readonly type: QueueJobType,
    public priority = JobPriority.Normal,
    public attempts = 1,
    public data: any
  ) {}
}
