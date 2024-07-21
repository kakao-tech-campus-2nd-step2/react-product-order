import { useQuery } from '@tanstack/react-query';

import { fetchInstance } from '../instance';

const getProductOptionPath = (productId: string) => {
  return `/v1/products/${productId}/options`;
};
export const getOption = async (productId: string) => {
  return fetchInstance.get(getProductOptionPath(productId));
};
export const useGetOption = (productId: string) => {
  return useQuery({
    queryKey: ['option', productId],
    queryFn: () => getOption(productId),
    select: (response) => response.data.options,
  });
};
