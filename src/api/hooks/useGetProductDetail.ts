import { useQuery } from '@tanstack/react-query';

import { getProductDetail } from '../apis/product';
import API from '../path';

export const useGetProductDetail = (productId: string) => {
  return useQuery({
    queryKey: [API.PRODUCT.DETAIL(productId)],
    queryFn: async () => {
      const res = await getProductDetail(productId);
      return res;
    },
  });
};
