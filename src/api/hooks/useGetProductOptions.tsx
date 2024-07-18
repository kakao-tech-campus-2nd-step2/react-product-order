import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '../instance';

const getProductOptionPath = (productId: string) => {
  return `/v1/products/${productId}/options`;
};
export const getOption = async (productId: string) => {
  const response = await fetchInstance.get(getProductOptionPath(productId));
  return response.data.options;
};
export const useGetOption = (productId: string) => {
  return useQuery({
    queryKey: ['option', productId],
    queryFn: () => getOption(productId),
  });
};
