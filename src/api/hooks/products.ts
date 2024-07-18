import { useQuery } from '@tanstack/react-query';

import type { ProductOptionsData } from '@/types';

import { fetchInstance } from '../instance';

const getProductOptionsPath = (productId: string) => `/api/v1/products/${productId}/options`;

export const getProductOptions = async (productId: string): Promise<ProductOptionsData> => {
  const response = await fetchInstance.get<ProductOptionsData>(getProductOptionsPath(productId));
  return response.data;
};

export const useGetProductOptions = (productId: string) => {
  return useQuery<ProductOptionsData, Error>({
    queryKey: ['productOptions', productId],
    queryFn: () => getProductOptions(productId),
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });
};
