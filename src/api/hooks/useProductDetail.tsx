import { useEffect, useState } from 'react';

import { fetchInstance } from '../../api/instance';

interface Price {
  basicPrice: number;
  discountRate: number;
  sellingPrice: number;
}

export interface ProductDetail {
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
  id: number;
  imageURL: string;
  isAccessibleProductPage: boolean;
  name: string;
  price: Price;
  productDescription: {
    displayImage: string;
  };
  productDetailInfo: {
    announcements: string[];
    terms: string[];
  };
  review: {
    averageRating: number;
    totalReviewCount: number;
  };
  wish: {
    isWished: boolean;
    wishCount: number;
  };
}

interface ProductDetailData {
  detail: ProductDetail;
}

const useProductDetail = (productId: string): ProductDetailData | null => {
  const [productDetail, setProductDetail] = useState<ProductDetailData | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetchInstance.get<ProductDetailData>(
          `/v1/products/${productId}/detail`,
        );
        setProductDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('제품 상세 정보를 가져오는 중 오류 발생:', error);
      }
    };

    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  return productDetail;
};

export default useProductDetail;
