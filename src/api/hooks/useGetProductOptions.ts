import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import type { ProductOptionsResponse } from '@/types';

import { fetchInstance } from '../instance';

type RequestParams = {
  productId: string;
};

const getProductOptionsPath = ({ productId }: RequestParams) => {
  return `/v1/products/${productId}/options`;
};

export const getProductOptions = async (params: RequestParams) => {
  const response = await fetchInstance.get<ProductOptionsResponse>(getProductOptionsPath(params));
  return response.data;
};

type Params = Pick<RequestParams, 'productId'>;

export const useGetProductOptions = ({
  productId,
}: Params): UseQueryResult<ProductOptionsResponse> => {
  return useQuery({
    queryKey: ['productOptions', productId],
    queryFn: () => getProductOptions({ productId }),
  });
};
