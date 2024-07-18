// src/components/ProductContents.tsx
import React from 'react';

import { useGetProduct } from '@/api/hooks/useGetProductDetails'; // useGetProduct 훅이 정의된 경로를 정확히 입력하세요
import type { GoodsData } from '@/types';

type ProductPageProps = {
  productId: string; 
};

const ProductContents: React.FC<ProductPageProps> = ({ productId }) => {
  const { data, isLoading, isError } = useGetProduct({ productId });

  // data를 로그로 출력하여 확인
  console.log('Product data:', data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (!data || !data.detail) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  // const productData: GoodsData = data.detail;
};

export default ProductContents;
