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

  interface SmallOption {
    id: number;
    key: string;
    level: number;
    options: [];
    price: number;
    stockQuantity: number;
    unlimitedStockQuantity: false;
    usable: boolean;
    value: string;
  }

  interface ProductOption {
    productId: number;
    productName: string;
    productPrice: number;
    giftOrderLimit: number;
    hasOption: boolean;
    names: string[];
    options: SmallOption[];
  }

  interface GetProductOptionsByIdResp {
    options: ProductOption;
  }

  interface PaymentThumbnail extends SmallOption {
    brandName: string;
    imageUrl: string;
    cnt: string;
  }

  // }
}
