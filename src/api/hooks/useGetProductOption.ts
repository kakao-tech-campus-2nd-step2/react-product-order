import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '../instance';

// Option data type 정의
export type OptionData = {
  id: number;
  name: string;
  subOptions?: OptionData[];
};

// Request parameter type 정의
type ProductOptionsRequestParams = {
  productId: number;
};

// API endpoint path 정의
const getProductOptionsPath = ({ productId }: ProductOptionsRequestParams) => {
  return `/v1/products/${productId}/options`;
};

// API 함수 정의
export const getProductOptions = async (params: ProductOptionsRequestParams): Promise<OptionData[]> => {
  const response = await fetchInstance.get(getProductOptionsPath(params));
  return response.data;
};

// Custom hook 정의
export const useGetProductOptions = (productId:  number): UseQueryResult<OptionData[]> => {
  return useQuery({
    queryKey: ['productOptions', productId],
    queryFn: () => getProductOptions({ productId }),
  });
};