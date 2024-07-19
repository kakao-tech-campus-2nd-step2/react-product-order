import { useSuspenseQuery } from '@tanstack/react-query';

import type { GoodsDetailOptionsData } from '@/types';

import { fetchInstance } from '../instance';
import type { GoodsDetailRequestParams } from './useGetGoodsDetail';

type Props = GoodsDetailRequestParams;

export type GoodsOptionsResponseData = {
  options: GoodsDetailOptionsData;
};

const getGoodsOptionsPath = (productId: string) => `/v1/products/${productId}/options`;

export const getGoodsOptions = async (params: GoodsDetailRequestParams) => {
  const response = await fetchInstance.get<GoodsOptionsResponseData>(
    getGoodsOptionsPath(params.productId),
  );
  return response.data;
};

export const useGetGoodsOptions = ({ productId }: Props) => {
  return useSuspenseQuery({
    queryKey: [getGoodsOptionsPath(productId)],
    queryFn: () => getGoodsOptions({ productId }),
  });
};
