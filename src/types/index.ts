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

type Wish = {
  isWished: boolean;
  wishCount: number;
};

type Price = {
  basicPrice: number;
  discountRate: number;
  sellingPrice: number;
};

type BrandInfo = {
  id: number;
  name: string;
  imageURL: string;
};

type Review = {
  averageRating: number;
  totalReviewCount: number;
};

type ProductDescription = {
  displayImage: string;
};

type Announcement = {
  name: string;
  value: string;
  displayOrder: number;
};

type Term = {
  displayCode: string;
  title: string;
  description: string;
};

type ProductDetailInfo = {
  announcements: Announcement[];
  terms: Term[];
};

export type ProductDetail = {
  detail: {
    id: number;
    name: string;
    imageURL: string;
    wish: Wish;
    price: Price;
    brandInfo: BrandInfo;
    isAccessableProductPage: boolean;
    review: Review;
    productDescription: ProductDescription;
    productDetailInfo: ProductDetailInfo;
  };
};
