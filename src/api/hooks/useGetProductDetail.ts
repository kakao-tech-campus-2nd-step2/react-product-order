import { useQuery } from '@tanstack/react-query';

import type { ProductDetailData } from '@/types';

import { fetchInstance } from '../instance';

const getProductDetailPath = (productId: string) => `/v1/products/${productId}/detail`;

const getProductDetail = async (productId: string): Promise<ProductDetailData> => {
  console.log(`Fetching product details for productId: ${productId}`);
  const response = await fetchInstance.get<ProductDetailData>(getProductDetailPath(productId));
  console.log('API response:', response.data);
  return response.data;
};

export const useGetProductDetail = (productId: string) => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductDetail(productId),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};
