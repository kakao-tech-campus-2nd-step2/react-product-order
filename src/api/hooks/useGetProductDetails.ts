import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

type RequestParams ={
  productId: string;
};

export type ProductResponseData = {
  themes: GoodsData[];
};

const getProductPath = ({ productId }: RequestParams) => `/v1/products/${productId}/details`;

export const getProduct = async (params: RequestParams) => {
  const response = await fetchInstance.get<ProductResponseData>(getProductPath(params));
  return response.data;
};