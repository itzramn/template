import { BaseAPI } from './base.api';
import { SignUpData } from '../types/auth';

export class AuthAPI extends BaseAPI {
  public async login(email: string, password: string) {
    return this.api.post('/auth/login', { email, password });
  }

  public async signUp(data: SignUpData) {
    try {
      console.log(data);
      const response = await this.api.post('/auth/sign-up', data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
