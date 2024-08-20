import { AxiosError, AxiosResponse } from 'axios';

const DEFAULT_MESSAGE = 'Ha ocurrido un error inesperado';

export const handleAPIResponse = (response: AxiosResponse<any, any>) => {
  if (response.data.success) {
    return {
      message: '',
      success: true,
    };
  }
  return {
    message: response.data.message,
    success: false,
  };
};

export const handleAPIError = (error: unknown) => {
  if (error instanceof Error) {
    return {
      message: '',
      success: false,
    };
  } else if (error instanceof AxiosError) {
    return {
      message: error.response?.data.message || DEFAULT_MESSAGE,
      success: false,
    };
  }
  return {
    message: DEFAULT_MESSAGE,
    success: false,
  };
};
