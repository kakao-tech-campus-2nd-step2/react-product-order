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

export type ProductDetailData = {
  detail: {
    brandInfo: {
      id: number;
      name: string;
      imageURL: string;
    };
    id: number;
    imageURL: string;
    isAccessableProductPage: boolean;
    name: string;
    price: {
      basicPrice: number;
      discountRate: number;
      sellingPrice: number;
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
        displayOrder: number;
        title: string;
        description: string;
      }[];
    };
    review: {
      averageRating: number;
      totalReviewCount: number;
    };
    wish: {
      isWished: boolean;
      wishCount: number;
    };
  };
};

export type ProductOption = {
  optionId: string;
  name: string;
  additionalPrice: number;
};

export type ProductOptionsData = {
  options: ProductOption[];
};
