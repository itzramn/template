import { BaseAPI } from './base.api';
import { ResetPasswordData, SignInData, SignUpData } from '../types/auth';
import { APIResponse } from '@/types/api';
import { handleAPIError, handleAPIResponse } from '@/utils/api.utils';
import { FormFields as ChangePasswordData } from '@/schemas/changePassword';

export class AuthAPI extends BaseAPI {
  /**
   * Logs in the user using username and password.
   * @param credentials
   * @returns
   */
  async login(credentials: SignInData): Promise<APIResponse<string>> {
    try {
      const response = await this.api.post('/auth/sign-in', credentials);
      return handleAPIResponse(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  /**
   * Signs up the user.
   * @param data
   * @returns
   */
  async signUp(data: SignUpData): Promise<APIResponse<void>> {
    try {
      const response = await this.api.post('/auth/sign-up', data);
      return handleAPIResponse(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  /**
   * Sends an email with a code to reset the password.
   * @param username
   * @returns
   */
  async forgotPassword(username: string): Promise<APIResponse<void>> {
    try {
      const response = await this.api.post('/auth/forgot-password', {
        username,
      });
      return handleAPIResponse(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  /**
   * Verifies the password reset code.
   * @param username
   * @param otp
   * @returns
   */
  async verifyPassword(
    username: string,
    otp: string
  ): Promise<APIResponse<void>> {
    try {
      console.log(this.api);
      const response = await this.api.post('/auth/forgot-password/verify', {
        username,
        otp,
      });
      return handleAPIResponse(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  /**
   * Resets the password. This is the final step in the password reset process.
   * @param data
   * @returns
   */
  async resetPassword(data: ResetPasswordData): Promise<APIResponse<void>> {
    try {
      const response = await this.api.post('/auth/forgot-password/reset', data);
      return handleAPIResponse(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  /**
   * Use this method to change the password of the user after they have logged in.
   * @param data
   * @returns
   */
  async changePassword(data: ChangePasswordData) {
    try {
      const response = await this.api.post('/auth/change-password', {
        ...data,
        password: data.newPassword,
      });
      return handleAPIResponse(response);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}
