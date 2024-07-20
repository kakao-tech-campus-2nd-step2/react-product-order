import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import type { GetProductDetailResponse } from '@/types';

export const getGoodsDetail = async (productId: number) => {
  const response = await fetchInstance.get<GetProductDetailResponse>(
    `/v1/products/${productId}/detail`,
  );
  console.log('API response:', response.data);
  return response.data;
};

export const useGetGoodsDetail = (productId: number) => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => getGoodsDetail(productId),
  });
};
