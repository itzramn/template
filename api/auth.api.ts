import { BaseAPI } from './base.api';
import { SignInData, SignUpData } from '../types/auth';
import { APIResponse } from '@/types/api';
import { handleAPIError, handleAPIResponse } from '@/utils/api.utils';

export class AuthAPI extends BaseAPI {
  public async login(credentials: SignInData): Promise<APIResponse> {
    try {
      const response = await this.api.post('/auth/sign-in', credentials);
      return handleAPIResponse(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  public async signUp(data: SignUpData): Promise<APIResponse> {
    try {
      const response = await this.api.post('/auth/sign-up', data);
      return handleAPIResponse(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  public async forgotPassword(username: string): Promise<APIResponse> {
    try {
      const response = await this.api.post('/auth/forgot-password', {
        username,
      });
      return handleAPIResponse(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}
