export type ThemeData = {
  id: number;
  key: string;
  label: string;
  title: string;
  description?: string;
  backgroundColor: string;
  imageURL: string;
};

export type RankingFilterOption = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

export type GoodsData = {
  id: number;
  name: string;
  imageURL: string;
  wish: {
    wishCount: number;
    isWished: boolean;
  };
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

export interface GoodsDetailData extends GoodsData {
  isAccessableProductPage: boolean;
  review: {
    averageRating: number;
    totalReviewCount: number;
  };
  productDescription: {
    displayImage: string;
  };
  productDetailInfo: {
    announcement: { name: string; value: string; displayOrder: number }[];
  };
  terms: { displayCode: string; title: string; description: string }[];
}

export type OrderHistory = {
  id: number;
  count: number;
};

export type GoodsDetailOptionsData = {
  productId: number;
  productName: string;
  productPrice: number;
  hasOption: boolean;
  giftOrderLimit: number;
  names: string[];
  options: {
    key: string;
    value: string;
    level: number;
    options: {
      key: string;
      value: string;
      level: number;
      options: unknown[];
      id: number;
      usable: boolean;
      price: number;
      stockQuantity: number;
      unlimitedQuantity: boolean;
    }[];
    usable: boolean;
    stockQuantity: number;
    unlimitedStockQuantity: boolean;
    accessoryType: string;
    accessoryValue: string;
  }[];
};

export type FormData = {
  cashReceiptNumber?: string;
  cashReceiptType?: 'PERSONAL' | 'BUSINESS';
  hasCashReceipt: boolean;
  messageCardTextMessage: string;
  productId: number;
  productQuantity: number;
  receiverId: number;
  senderId: number;
};
