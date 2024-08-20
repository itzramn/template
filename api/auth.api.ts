import { BaseAPI } from './base.api';
import { SignUpData } from '../types/auth';

export class AuthAPI extends BaseAPI {
  public async login(email: string, password: string) {
    return this.api.post('/auth/login', { email, password });
  }

  public async signUp(data: SignUpData) {
    return this.api.post('/auth/signup', data);
  }
}
