import { AxiosError, AxiosResponse } from 'axios';

const DEFAULT_MESSAGE = 'Ha ocurrido un error inesperado';

export const handleAPIResponse = (response: AxiosResponse<any, any>) => {
  if (response.data.success) {
    return {
      message: '',
      success: true,
    };
  }
  console.error('Response error', response);
  return {
    message: response.data.message,
    success: false,
  };
};

export const handleAPIError = (error: unknown) => {
  if (error instanceof Error) {
    console.error('Error', error);
    return {
      message: error.message,
      success: false,
    };
  } else if (error instanceof AxiosError) {
    console.error('AxiosError', error);
    return {
      message: error.response?.data.message || DEFAULT_MESSAGE,
      success: false,
    };
  }
  console.error('Unknown error', error);
  return {
    message: DEFAULT_MESSAGE,
    success: false,
  };
};
