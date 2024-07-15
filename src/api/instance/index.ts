import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  return instance;
};

export const BACKEND_API = initInstance({
  // baseURL: import.meta.env.VITE_BASE_URL,
  baseURL: 'https://react-gift-mock-api-ppochaco.vercel.app',
});

BACKEND_API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const customError = new Error(getErrorMessage(error));
    return Promise.reject(customError);
  }
);

function getErrorMessage(error: AxiosError): string {
  if (error.response) {
    switch (error.response.status) {
      case 404:
        return API_ERROR_MESSAGES.DATA_NOT_FOUND;
      default:
        return API_ERROR_MESSAGES.FETCH_ERROR;
    }
  }

  if (error.request) {
    return API_ERROR_MESSAGES.NETWORK_ERROR;
  }

  return API_ERROR_MESSAGES.UNKNOWN_ERROR;
}
