import * as bcrypt from 'bcrypt';

export abstract class cryptoUtil {
  static async generateSalt(): Promise<string> {
    return bcrypt.genSalt();
  }
  static async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  static async validatePassword(
    passwordPlain: string,
    salt: string,
    passwordCrypt: string,
  ): Promise<boolean> {
    const hash = await this.hashPassword(passwordPlain, salt);
    return hash === passwordCrypt;
  }
}
