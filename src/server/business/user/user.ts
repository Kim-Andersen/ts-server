import crypto from 'crypto';

import { EmailSigninToken } from '../../../shared/contract/EmailSigninToken';

class User {
  public async createEmailSigninToken(
    email: string
  ): Promise<EmailSigninToken> {
    const token = this.generateRandomHexString();

    return new Promise<EmailSigninToken>((resolve, reject) => {
      // Add to DB.
      // ...

      setTimeout(() => resolve(new EmailSigninToken(email, token)), 100);
    });
  }

  private generateRandomHexString(numBytes = 20): string {
    const buffer = crypto.randomBytes(numBytes);
    return buffer.toString('hex');
  }
}

export default new User();
