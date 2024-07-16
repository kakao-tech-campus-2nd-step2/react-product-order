import { useQuery } from '@tanstack/react-query';

import type { ProductDetailData } from '@/types';

import { fetchInstance } from '../instance';

export type ProductDetailResponseData = {
  detail: ProductDetailData;
};

const getThemesProductsDetailPath = (productId: string) => `/v1/products/${productId}/detail`;

export const getProductDetail = async (productId: string) => {
  const response = await fetchInstance.get<ProductDetailResponseData>(
    getThemesProductsDetailPath(productId),
  );
  return response.data;
};

export const useGetThemeProductDetail = (productId: string) =>
  useQuery({
    queryKey: [getThemesProductsDetailPath(productId)],
    queryFn: () => getProductDetail(productId),
  });
