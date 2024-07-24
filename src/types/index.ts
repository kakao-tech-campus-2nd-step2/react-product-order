export type ThemeData = {
  id: number;
  key: string;
  label: string;
  imageURL: string;
  title: string;
  description?: string;
  backgroundColor: string;
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

export type ProductDetail = {
  id: number;
  name: string;
  imageURL: string;
  wish: {
    isWished: boolean;
    wishCount: number;
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
  isAccessableProductPage: boolean;
  review: {
    averageRating: number;
    totalReviewCount: number;
  };
  productDescription: {
    displayImage: string;
  };
  productDetailInfo: {
    announcements: Array<{ name: string; value: string; displayOrder: number }>;
    terms: Array<{ displayCode: string; title: string; description: string }>;
  };
};
