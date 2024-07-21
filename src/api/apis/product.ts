import type { GoodsData, RankingFilterOption } from '@/types';

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

interface ProductOption {
  key: string;
  value: string;
  level: number;
  options: ProductOption[];
  id: number;
  usable: boolean;
  price: number;
  stockQuantity: number;
  unlimitedStockQuantity: boolean;
}

interface ProductOptionResponseData {
  options: {
    productId: number;
    productName: string;
    productPrice: number;
    hasOption: boolean;
    giftOrderLimit: number;
    names: string[];
    options: ProductOption[];
  };
}

export interface RankingProductsResponseData {
  products: GoodsData[];
}

export const getProductDetail = async (productId: string) => {
  const response = await fetchInstance.get<ProductDetaiResponseData>(API.PRODUCT.DETAIL(productId));

  return response.data;
};

export const getProductOption = async (productId: string) => {
  const response = await fetchInstance.get<ProductOptionResponseData>(
    API.PRODUCT.OPTION(productId),
  );

  return response.data;
};

export const getRankingProducts = async (filterOption: RankingFilterOption) => {
  const response = await fetchInstance.get<RankingProductsResponseData>(
    API.PRODUCT.RANKING(filterOption),
  );
  return response.data;
};
