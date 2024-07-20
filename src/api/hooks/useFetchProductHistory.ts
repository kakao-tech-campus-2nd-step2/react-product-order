import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchInstance } from '@/api/instance';
import type { GoodsData } from '@/types';

export type GoodsDetailRequestParams = {
  productId: string;
};

export type GoodsDetailResponseData = {
  detail: GoodsData;
};

const getGoodsDetailPath = (goodsId: string) => `/v1/products/${goodsId}/detail`;

export const getGoodsDetail = async (params: GoodsDetailRequestParams) => {
  const response = await fetchInstance.get<GoodsDetailResponseData>(
    getGoodsDetailPath(params.productId),
  );
  return response.data;
};

export const useFetchProductHistory = (productId: string) => {
  return useSuspenseQuery({
    queryKey: [getGoodsDetailPath(productId)],
    queryFn: () => getGoodsDetail({ productId }),
    select: (data) => data.detail,
  });
};
