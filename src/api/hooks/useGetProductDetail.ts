import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

// Data type 정의
export type ProductDetailData = GoodsData & {
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

// Request parameter type 정의
type ProductDetailRequestParams = {
  productId: number;
};

// API endpoint path 정의
const getProductDetailPath = ({ productId }: ProductDetailRequestParams) => {
  return `/v1/products/${productId}/detail`;
};

// API 함수 정의
export const getProductDetail = async (params: ProductDetailRequestParams): Promise<ProductDetailData> => {
  const response = await fetchInstance.get(getProductDetailPath(params));
  return response.data.detail;
};

// Custom hook 정의
export const useGetProductDetail = (productId: number): UseQueryResult<ProductDetailData> => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductDetail({ productId }),
  });
};
