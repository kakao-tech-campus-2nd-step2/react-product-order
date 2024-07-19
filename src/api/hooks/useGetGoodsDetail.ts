import { useSuspenseQuery } from '@tanstack/react-query';

import type { GoodsDetailData } from '@/types';

import { fetchInstance } from '../instance';

export type GoodsDetailRequestParams = {
  productId: string;
};

type Props = GoodsDetailRequestParams;

export type GoodsDetailResponseData = {
  detail: GoodsDetailData;
};

const getGoodsDetailPath = (goodsId: string) => `/v1/products/${goodsId}/detail`;

export const getGoodsDetail = async (params: GoodsDetailRequestParams) => {
  const response = await fetchInstance.get<GoodsDetailResponseData>(
    getGoodsDetailPath(params.productId),
  );
  return response.data;
};

export const useGetGoodsDetail = ({ productId }: Props) => {
  return useSuspenseQuery({
    queryKey: [getGoodsDetailPath(productId)],
    queryFn: () => getGoodsDetail({ productId }),
  });
};
