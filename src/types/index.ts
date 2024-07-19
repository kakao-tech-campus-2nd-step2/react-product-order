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

export type ProductDetailData = GoodsData & {
  isAccessableProductPage: boolean;
  review: {
    averageRating: number;
    totalReviewCount: number;
  };
  productDescription: {
    displayImage: string;
  };
  productDetailInfo: {
    announcements: {
      displayOrder: number;
      name: string;
      value: string;
    }[];
    terms: {
      displayCode: string;
      title: string;
      description: string;
    }[];
  };
};

export type ProductDetailResponseData = {
  detail: ProductDetailData;
};

export type ProductOrderRequestBody = {
  productId: number;
  productOptionId: number;
  productQuantity: number;
  messageCardTemplateId: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType?: "PERSONAL" | "BUSINESS";
  cashReceiptNumber?: string;
};

export type MoreOptionData = {
  key: string;
  value: string;
  level: number;
  options: MoreOptionData[];
  id: number;
  usable: boolean;
  price: number;
  stockQuantity: number;
  unlimitedStockQuantity: boolean;
};

export type ProductOptionData = {
  productId: number;
  productName: string;
  productPrice: number;
  hasOption: boolean;
  giftOrderLimit: number;
  names: string[];
  options: MoreOptionData[];
};