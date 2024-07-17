import { useEffect, useState } from 'react';

import { fetchInstance } from '../../api/instance';

interface ProductDetailData {
  imageUrl: string;
  name: string;
  price: number;
  description: string;
}

const useProductDetail = (productId: string): ProductDetailData | null => {
  const [productDetail, setProductDetail] = useState<ProductDetailData | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetchInstance.get<ProductDetailData>(`/v1/products/${productId}/detail`);
        setProductDetail(response.data);
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
