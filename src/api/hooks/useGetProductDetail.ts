import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import type { ProductDetailResponse } from '@/types';

import { fetchInstance } from '../instance';

type RequestParams = {
  productId: string;
};

const getProductDetailPath = ({ productId }: RequestParams) => {
  return `/v1/products/${productId}/detail`;
};

export const getProductDetail = async (params: RequestParams) => {
  const response = await fetchInstance.get<ProductDetailResponse>(getProductDetailPath(params));
  return response.data;
};

type Params = Pick<RequestParams, 'productId'>;

export const useGetProductDetail = ({
  productId,
}: Params): UseQueryResult<ProductDetailResponse> => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductDetail({ productId }),
  });
};
