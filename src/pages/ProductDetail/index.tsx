import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, isError } = useGetProductDetail(productId || '');

  useEffect(() => {
    console.log('ProductDetail rendered with productId:', productId);
    console.log('Product data:', data);
  }, [productId, data]);

  if (isLoading) return <TextView>Loading...</TextView>;
  if (isError) return <TextView>Error loading product details</TextView>;
  if (!data) return <TextView>No product details available.</TextView>;

  const product = data.detail;
  const imageUrl = product.imageURL;
  const sellingPrice = product.price?.sellingPrice;

  return (
    <Container>
      <Image src={imageUrl} alt={product.name} />
      <Title>{product.name}</Title>
      <Price>{sellingPrice}원</Price>
    </Container>
  );
};

export default ProductDetail;

const Container = styled.div`
  padding: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-top: 20px;
`;

const Price = styled.p`
  margin-top: 10px;
  font-size: 24px;
  color: red;
`;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
