import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ProductDetailData } from '../../types';
import { fetchInstance } from '../instance';

const fetchProductDetails = async (productId: string): Promise<ProductDetailData> => {
  const { data } = await fetchInstance.get<ProductDetailData>(`/v1/products/${productId}/detail`);
  return data;
};

const useGetProductDetails = (productId: string): UseQueryResult<ProductDetailData, Error> => {
  return useQuery<ProductDetailData, Error>({
    queryKey: ['productDetails', productId],
    queryFn: () => fetchProductDetails(productId),
  });
};

export default useGetProductDetails;

export {};
