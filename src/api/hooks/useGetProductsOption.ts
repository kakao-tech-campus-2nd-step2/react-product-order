import { useQuery } from '@tanstack/react-query';

import type { GoodsOptionData } from '@/types';

import { fetchInstance } from '../instance';

export type GoodsOptionRequestParams = {
  productId: string;
};

export type GoodsOptionsResponseData = {
  options: GoodsOptionData;
};

const getGoodsOptions = async (goodsId: string) => {
  const response = await fetchInstance.get<GoodsOptionsResponseData>(
    `/v1/products/${goodsId}/options`,
  );
  return response.data.options;
};

export const useGetGoodsOptions = ({ productId }: GoodsOptionRequestParams) => {
  return useQuery<GoodsOptionData, Error>({
    queryKey: ['goodsOptions', productId],
    queryFn: () => getGoodsOptions(productId),
  });
};
