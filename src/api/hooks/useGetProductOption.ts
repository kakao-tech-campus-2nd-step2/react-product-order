import { useQuery } from '@tanstack/react-query';

import { getProductOption } from '../apis/product';
import API from '../path';

export const useGetProductOption = (productId: string) => {
  return useQuery({
    queryKey: [API.PRODUCT.OPTION(productId)],
    queryFn: async () => {
      const res = await getProductOption(productId);
      return res;
    },
  });
};
