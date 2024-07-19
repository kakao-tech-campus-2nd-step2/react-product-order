export interface Theme {
  id: number;
  key: string;
  label: string;
  title?: string;
  imageURL?: string;
  description?: string;
  backgroundColor?: string;
}

export interface Product {
  id: number;
  imageURL: string;
  brandInfo: {
    name: string;
  };
  name: string;
  price: {
    basicPrice: number;
  };
}

export interface ProductWithPageData {
  products: Product[];
  nextPageToken?: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}
export interface ProductDetailResponse {
  detail: {
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
  };
}
export interface ProductOptionResponse {
  options: {
    productId: number;
    productName: string;
    productPrice: number;
    hasOption: boolean;
    giftOrderLimit: number;
  };
}
