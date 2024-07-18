import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { OptionData } from '@/types';

import { fetchInstance } from '../instance';

type RequestParams = {
  productId: string;
};

type ProductOptionsResponseData = {
  options: OptionData;
};

const getProductOptionsPath = ({ productId }: RequestParams) => {
  return `v1/products/${productId}/options`;
};

export const getProductOptions = async (params: RequestParams) => {
  const response = await fetchInstance.get<ProductOptionsResponseData>(
    getProductOptionsPath(params),
  );
  return response.data.options;
};

export const useGetProductOptions = (productId: string): UseQueryResult<OptionData> => {
  return useQuery<OptionData>({
    queryKey: ['options', productId],
    queryFn: () => getProductOptions({ productId }),
    enabled: !!productId,
  });
};