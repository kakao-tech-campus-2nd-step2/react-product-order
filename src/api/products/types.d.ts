import type { GoodsData } from '@/types';

declare namespace Products {
  interface ProductData extends GoodsData {}

  interface ProductDetailData extends ProductData {
    detail: ProductDetailData;
    // detail: {
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
    // };
  }

  interface ProductOptions {
    options: {
      productId: number;
      productName: string;
      productPrice: number;
      hasOption: boolean;
      giftOrderLimit: number;
      names: [];
      options: {
        key: string;
        value: string;
        level: number;
        options: [];
        id: number;
        usable: boolean;
        price: number;
        stockQuantity: number;
        unlimitedStockQuantity: false;
      }[];
    };
  }
}
