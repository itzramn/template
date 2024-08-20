import { BaseAPI } from './base.api';
import { SignUpData } from '../types/auth';
import { APIResponse } from '@/types/api';
import { handleAPIError, handleAPIResponse } from '@/utils/api.utils';

export class AuthAPI extends BaseAPI {
  public async login(email: string, password: string) {
    return this.api.post('/auth/login', { email, password });
  }

  public async signUp(data: SignUpData): Promise<APIResponse> {
    try {
      const response = await this.api.post('/auth/sign-up', data);
      return handleAPIResponse(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}
