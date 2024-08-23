export type APIResponse<T> = {
  message: string;
  success: boolean;
  data?: T;
};
