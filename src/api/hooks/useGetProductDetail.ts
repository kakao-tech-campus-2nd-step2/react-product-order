import { useQuery } from '@tanstack/react-query';

import type { ProductDetailData } from '@/types';

import { fetchInstance } from '../instance';

const getProductDetailPath = (productId: string) => `/api/v1/products/${productId}/detail`;

const getProductDetail = async (productId: string): Promise<ProductDetailData> => {
  const response = await fetchInstance.get<ProductDetailData>(getProductDetailPath(productId));
  return response.data;
};

export const useGetProductDetail = (productId: string) => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductDetail(productId),
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};
