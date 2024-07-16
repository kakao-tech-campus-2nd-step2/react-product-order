import { useQuery } from '@tanstack/react-query';

import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

type ProductDetaiResponseData = GoodsData & {
  isAccessableProductPage: boolean;
  review: {
    averageRating: number;
    totalReviewCount: number;
  };
  productDescription: {
    images: string[];
  };
  productDetailInfo: {
    announcements: {
      displayOrder: number;
      name: string;
      value: string;
    }[];
    terms: {
      displayOrder: number;
      title: string;
      description: string;
    }[];
  };
};

const getProductDetailPath = (productId: number) => `/v1/products/${productId}/detail`;
const productDetailQueryKey = (productId: number) => [getProductDetailPath(productId)];

export const getProductDetail = async (productId: number) => {
  const response = await fetchInstance.get<ProductDetaiResponseData>(
    getProductDetailPath(productId),
  );
  return response.data;
};

export const useGetProductDetail = (productId: number) =>
  useQuery({
    queryKey: productDetailQueryKey(productId),
    queryFn: () => getProductDetail(productId),
  });
