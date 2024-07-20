import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { Option, ProductDetailData } from '@/types';

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

export const fetchInstance = initInstance({
  baseURL: 'https://react-gift-mock-api-eunkyung.vercel.app/api',
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});

export const fetchProductDetails = async (productId: string) => {
  const { data } = await fetchInstance.get<ProductDetailData>(`/v1/products/${productId}/detail`);
  return data;
};

export const fetchProductOptions = async (productId: string) => {
  const { data } = await fetchInstance.get<Option[]>(`/v1/products/${productId}/options`);
  return data;
};
