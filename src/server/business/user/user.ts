import { EmailSigninToken } from '../../../shared/contract/EmailSigninToken';

class User {
  public async createEmailSigninToken(
    email: string
  ): Promise<EmailSigninToken> {
    const token = this.generateSecrectEmailSigninToken();

    return new Promise<EmailSigninToken>((resolve, reject) => {
      // Add to DB.
      // ...

      setTimeout(() => resolve(new EmailSigninToken(email, token)), 100);
    });
  }

  private generateSecrectEmailSigninToken(): string {
    return '43hktj3%tadas098OJAS';
  }
}

export default new User();
