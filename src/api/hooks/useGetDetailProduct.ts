import { useQuery } from '@tanstack/react-query';

import type { ProductDetailData } from '@/types';

import { fetchInstance } from '../instance';

export type GetDetailProductParams = {
  productId: string;
};

export type GetDetailProductResponse = {
  detail: ProductDetailData;
};

const getDetailProductPath = ({ productId }: GetDetailProductParams) =>
  `/v1/products/${productId}/detail`;

export const getDetailProduct = async (params: GetDetailProductParams) => {
  const response = await fetchInstance.get<GetDetailProductResponse>(getDetailProductPath(params));
  return response.data;
};

export const useGetDetailProduct = (params: GetDetailProductParams) => {
  return useQuery<GetDetailProductResponse>({
    queryKey: ['getDetailProduct', params.productId],
    queryFn: () => getDetailProduct(params),
  });
};
