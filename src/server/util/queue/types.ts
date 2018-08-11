export enum JobType {
  SendMailMessage = 'SendMailMessage'
}

export enum JobPriority {
  Low = 'low',
  Normal = 'normal',
  Medium = 'medium',
  High = 'high',
  Critical = 'critical'
}

export class JobDescription {
  constructor(
    public readonly type: JobType,
    public priority = JobPriority.Normal,
    public attempts = 1,
    public data: any
  ) {}
}
