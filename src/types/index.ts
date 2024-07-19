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

export type Price = {
  basicPrice: number;
  discountRate: number;
  sellingPrice: number;
};

export type ProductsData = {
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
    price: Price;
  };
};

export type ProductOptions = {
  id: number;
  key: string;
  stockQuantity: number;
  usable: boolean;
  value: string;
}

export type ProductOptionData = {
  options: {
    giftOrderLimit: number;
    hasOption: boolean;
    names: string[];
    options: ProductOptions[];
    productId: string;
    productName: string;
    productPrice: number;
  }
}
