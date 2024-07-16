import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';

type AnnouncementsData = {
  name: string;
  value: string;
  displayOrder: number;
};

type TermsData = {
  displayCode: string;
  title: string;
  description: string;
};

type ProductDetailData = GoodsData & {
  isAccessableProductPage: boolean;
  review: {
    averageRating: number;
    totalReviewCount: number;
  };
  productDescription: {
    displayImage: string;
  };
  productDetailInfo: {
    announcements: AnnouncementsData[];
    terms: TermsData[];
  };
};

type ProductDetailResponseData = {
  detail: ProductDetailData;
};

const getProductDetail = (productId: string) => {
  return `/v1/products/${productId}/detail`;
};

export const useGetProductDetail = async (productId: string) => {
  const response = await fetchInstance.get<ProductDetailResponseData>(getProductDetail(productId));
  return response.data;
};
