import { useQuery } from '@tanstack/react-query';

import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

export type ProductData = {
  detail: GoodsData;
};

const getProductDetailPath = (productId: string) => `/v1/products/${productId}/detail`;

export const getProductDetail = async (productId: string) => {
  const response = await fetchInstance.get<ProductData>(getProductDetailPath(productId));
  return response.data;
};

export const useGetProduct = (productId: string) =>
  useQuery({
    queryKey: [getProductDetailPath(productId)],
    queryFn: () => getProductDetail(productId),
  });
