import { useQuery } from '@tanstack/react-query';

import type { ProductOptionData } from '@/types';

import { fetchInstance } from '../instance';

export type ProductOptionResponseData = {
  options: ProductOptionData;
};

const getThemesProductsOptionPath = (productId: string) => `/v1/products/${productId}/options`;

export const getProductOption = async (productId: string) => {
  const response = await fetchInstance.get<ProductOptionResponseData>(
    getThemesProductsOptionPath(productId),
  );
  return response.data;
};

export const useGetThemeProductOption = (productId: string) =>
  useQuery({
    queryKey: [getThemesProductsOptionPath(productId)],
    queryFn: () => getProductOption(productId),
  });
