import { useEffect, useState } from 'react';

import { fetchInstance } from '../../api/instance'

interface ProductDetailData {
  imageUrl: string;
  name: string;
  price: number;
  description: string;
}

const useProductDetail = (productKey: string): ProductDetailData | null => {
  const [productDetail, setProductDetail] = useState<ProductDetailData | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetchInstance.get<ProductDetailData>(`/v1/products/${productKey}/detail`);
        setProductDetail(response.data);
      } catch (error) {
        console.error('제품 상세 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchProductDetail();
  }, [productKey]);

  return productDetail;
};

export default useProductDetail;
