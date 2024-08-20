import { API } from '@/utils/utils';
import { AxiosInstance } from 'axios';

export class BaseAPI {
  api: AxiosInstance;

  constructor(token?: string) {
    this.api = this.configureAPI(token);
  }

  private configureAPI(token?: string): AxiosInstance {
    const api = API;

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    return api;
  }
}
