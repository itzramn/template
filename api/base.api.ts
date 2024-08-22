import { API } from '@/utils/utils';
import { AxiosInstance } from 'axios';

export class BaseAPI {
  protected api: AxiosInstance;

  constructor(token?: string | null) {
    this.api = this.configureAPI(token);
  }

  private configureAPI(token?: string | null): AxiosInstance {
    const api = API;

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    return api;
  }
}
