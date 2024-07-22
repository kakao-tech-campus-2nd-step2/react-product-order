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

export type ProductOrderRequestBody = {
  productId: number;
  productOptionId: number;
  productQuantity: number;
  messageCardTemplateId: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber: string;
};

export type GoodDetailData = {
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

export type MessageCardTemplateData = {
  id: number;
  defaultTextMessage: string;
  thumbURL: string;
  imageURL: string;
};

export type MyAccountInfoData = {
  id: number;
  name: string;
  birthday?: string;
  profileImageURL: string;
  point: number;
};

export type ThemesProductsResponseData = {
  products: GoodsData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type OptionData = {
  productId: number;
  productName: string;
  giftOrderLimit: number;
  hasOption: boolean;
  productPrice: number;
  names: string[];
  options: {
    key: string;
    value: string;
    stockQuantity: number;
    unlimitedStockQuantity: boolean;
    usable: boolean;
    options: {
      key: string;
      value: string;
      stockQuantity: number;
      unlimitedStockQuantity: boolean;
      usable: boolean;
    }[];
  }[];
};
export type GetProductsByThemeResponse = ThemesProductsResponseData;

export type GetProductDetailResponse = {
  detail: GoodDetailData & GoodsData;
  options: OptionData;
};

export type GetMessageCardTemplatesResponse = {
  templates: MessageCardTemplateData[];
};

export type GetMyAccountInfoResponse = MyAccountInfoData;

export type GetMyWishListResponse = ThemesProductsResponseData;

export type ChargeMyPointsResponse = void;

export type OrderProductResponse = void;
