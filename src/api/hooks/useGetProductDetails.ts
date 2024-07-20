import { useQuery } from '@tanstack/react-query';

import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

type RequestParams = {
  productId: string;
};

const getProductPath = ({ productId }: RequestParams) => `/v1/products/${productId}/detail`;

const productQueryKey = (productId: string) => [`/v1/products/${productId}/detail`];

export const getProduct = async (params: RequestParams): Promise<{ detail: GoodsData }> => {
  const response = await fetchInstance.get<{ detail: GoodsData }>(getProductPath(params));
  console.log('API Response:', response.data);
  return response.data;
};

export const useGetProduct = (params: RequestParams) =>
  useQuery<{ detail: GoodsData }, Error>({
    queryKey: productQueryKey(params.productId),
    queryFn: () => getProduct(params),
  });
