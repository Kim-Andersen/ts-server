export class EmailSigninToken {
  public id?: number;
  constructor(
    public readonly email: string,
    public readonly token: string,
    public readonly expiresAt: Date
  ) {}
}
