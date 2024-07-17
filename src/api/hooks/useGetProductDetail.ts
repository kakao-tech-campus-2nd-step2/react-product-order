import { useQuery } from '@tanstack/react-query';

import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

type ProductDetaiResponseData = {
  detail: GoodsData & {
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
};

const getProductDetailPath = (productId: string) => `/v1/products/${productId}/detail`;
const productDetailQueryKey = (productId: string) => [getProductDetailPath(productId)];

export const getProductDetail = async (productId: string) => {
  const response = await fetchInstance.get<ProductDetaiResponseData>(
    getProductDetailPath(productId),
  );
  return response.data;
};

export const useGetProductDetail = (productId: string) => {
  return useQuery({
    queryKey: productDetailQueryKey(productId),
    queryFn: async () => {
      const res = await getProductDetail(productId as string);
      return res;
    },
  });
};
