import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

export type GoodsDetailRequestParams = {
  productId: string;
};

export type GoodsDetailResponseData = {
  detail: GoodsData;
};

export const getGoodsDetail = async (goodsId: string) => {
  const response = await fetchInstance.get<GoodsDetailResponseData>(
    `/v1/products/${goodsId}/detail`,
  );
  return response.data;
};

export const useGetGoodsDetail = (
  { productId }: GoodsDetailRequestParams,
  options?: UseQueryOptions<GoodsData, Error>,
) => {
  return useQuery<GoodsData, Error>({
    queryKey: ['goodsDetail', productId],
    queryFn: async () => {
      const response = await getGoodsDetail(productId);
      return response.detail;
    },
    ...options,
  });
};
