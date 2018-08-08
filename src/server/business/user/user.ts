export class EmailSigninToken {
  constructor(public readonly email: string, public readonly token: string) {}
}

class User {
  public async newEmailSignin(email: string): Promise<EmailSigninToken> {
    const token = this.generateEmailSigninToken();

    return new Promise<EmailSigninToken>((resolve, reject) => {
      // Add to DB.
      // ...

      setTimeout(() => resolve(new EmailSigninToken(email, token)), 100);
    });
  }

  private generateEmailSigninToken(): string {
    return '43hktj3%tadas098OJAS';
  }
}

export default new User();
