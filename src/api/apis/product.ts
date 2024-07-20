import type { GoodsData } from '@/types';

import { fetchInstance } from '../instance';
import API from '../path';

interface ProductDetaiResponseData {
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
}

export const getProductDetail = async (productId: string) => {
  const response = await fetchInstance.get<ProductDetaiResponseData>(API.PRODUCT.DETAIL(productId));

  return response.data;
};
