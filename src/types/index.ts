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

export interface GoodsData {
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
}

export interface Wish {
  wishCount: number;
  isWished: boolean;
}

export interface Price {
  basicPrice: number;
  discountRate: number;
  sellingPrice: number;
}

export interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

export interface Review {
  averageRating: number;
  totalReviewCount: number;
}

export interface ProductDescription {
  images: string[];
}

export interface Announcement {
  displayOrder: number;
  name: string;
  value: string;
}

export interface Terms {
  displayOrder: number;
  title: string;
  description: string;
}

export interface ProductDetailInfo {
  announcements: Announcement[];
  terms: Terms[];
}

export interface ProductData {
  id: number;
  name: string;
  imageURL: string;
  wish: Wish;
  price: Price;
  brandInfo: BrandInfo;
}

export interface ProductDetailData extends ProductData {
  isAccessableProductPage: boolean;
  review: Review;
  productDescription: ProductDescription;
  productDetailInfo: ProductDetailInfo;
}
