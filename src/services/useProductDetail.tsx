import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosInstance } from '.';
import type { ProductDetailResponse } from './types';

export const useProductDetail = (productId: string) =>
  useQuery({
    queryKey: ['productDetail', productId],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<ProductDetailResponse>(`v1/products/${productId}/detail`);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            console.error('해당하는 상품이 없습니다:', error);
            throw new Error('해당하는 상품이 없습니다.');
          } else {
            console.error('데이터를 불러오는 중에 문제가 발생했습니다:', error);
            throw new Error('데이터를 불러오는 중에 문제가 발생했습니다.');
          }
        } else {
          console.error('Unexpected error occurred:', error);
          throw new Error('Unexpected error occurred');
        }
      }
    },
  });
