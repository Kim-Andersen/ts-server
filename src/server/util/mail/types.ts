export class MailMessage {
  constructor(
    public readonly to: string,
    public readonly from: string,
    public readonly subject: string,
    public readonly text?: string,
    public readonly html?: string
  ) {
    if (!text && !html) {
      throw Error(`text or html is required`);
    }
  }
}
