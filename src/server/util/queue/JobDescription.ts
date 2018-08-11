import { JobPriority } from './JobPriority';
import { JobType } from './JobType';

export class JobDescription {
  constructor(
    public readonly type: JobType,
    public priority = JobPriority.Normal,
    public attempts = 1,
    public data: any
  ) {}
}
