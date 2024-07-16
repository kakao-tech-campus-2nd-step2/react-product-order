import { useQuery } from '@tanstack/react-query';

import type { ProductDetail } from '@/types';

import { fetchInstance } from '../instance';

const getProductDeatilPath = (productId: string) => {
  return `/v1/products/${productId}/detail`;
};
export const getDetail = async (productId: string) => {
  const response = await fetchInstance.get<ProductDetail>(getProductDeatilPath(productId));
  return response.data.detail;
};
export const useGetDetail = (productId: string) => {
  return useQuery({
    queryKey: ['products', productId],
    queryFn: () => getDetail(productId),
  });
};
