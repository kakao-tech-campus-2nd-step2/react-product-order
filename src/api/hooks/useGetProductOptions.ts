import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ProductOptionData } from '../../types';
import { fetchInstance } from '../instance';

const fetchProductOptions = async (productId: string): Promise<ProductOptionData[]> => {
  const { data } = await fetchInstance.get<ProductOptionData[]>(`/v1/products/${productId}/options`);
  return data;
};

const useGetProductOptions = (productId: string): UseQueryResult<ProductOptionData[], Error> => {
  return useQuery<ProductOptionData[], Error>({
    queryKey: ['productOptions', productId],
    queryFn: () => fetchProductOptions(productId),
  });
};

export default useGetProductOptions;

export {};
