import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { Spinner } from '@/components/common/Spinner';
import { ProductDetailContent } from '@/components/features/ProductDetail/ProductDetail/ProductDetailContent';
import { useAuth } from '@/provider/Auth';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, isError } = useGetProductDetail(productId || '');
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (!isLoading && !data) {
      navigate('/');
    }
  }, [productId, data, isLoading, navigate]);

  const handleGiftButtonClick = () => {
    if (!isAuthenticated) {
      alert('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?');
      navigate('/login');
    }
  };

  if (isLoading)
    return (
      <LoadingContainer>
        <Spinner size={48} />
      </LoadingContainer>
    );
  if (isError) return <TextView>상품을 불러오는 도중에 에러가 발생했습니다.</TextView>;
  if (!data) return <TextView>상품이 없습니다.</TextView>;

  const product = data.detail;

  return (
    <ProductDetailContent
      imageUrl={product.imageURL}
      name={product.name}
      price={product.price?.sellingPrice}
      onButtonClick={handleGiftButtonClick}
    />
  );
};

export default ProductDetail;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
