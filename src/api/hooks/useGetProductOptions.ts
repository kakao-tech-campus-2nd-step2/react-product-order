import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ProductOption } from '@/types';

import { fetchInstance } from '../instance';

const fetchProductOptions = async (productId: number): Promise<ProductOption> => {
  const response = await fetchInstance.get(`/v1/products/${productId}/options`);
  return response.data.options; 
};

export const useGetProductOptions = (productId: number): UseQueryResult<ProductOption> => {
  return useQuery<ProductOption, Error>({
    queryKey: ['productOptions', productId],
    queryFn: () => fetchProductOptions(productId)
  });
};