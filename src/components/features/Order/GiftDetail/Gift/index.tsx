import React from 'react';
import styled from '@emotion/styled';
import { Image } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { ProductDetailResponse } from '@internalTypes/responseTypes';
import { AxiosError } from 'axios';
import { getProductsDetail } from '@apis/products';

const IMAGE_SIZE = 86;

export default function Gift() {
  const data = sessionStorage.getItem('orderHistory');
  const { id: productId, count } = data ? JSON.parse(data) : null;

  const { data: productDetailData } = useQuery<ProductDetailResponse, AxiosError>({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductsDetail({ productId }),
  });

  return (
    <GiftContainer>
      <Image src={productDetailData?.detail.imageURL} maxW={IMAGE_SIZE} mr={4} />
      <div>
        <GiftName>{productDetailData?.detail.brandInfo.name}</GiftName>
        <GiftInfo>
          {productDetailData?.detail.name} X {count}개
        </GiftInfo>
      </div>
    </GiftContainer>
  );
}

const GiftContainer = styled.div`
  display: flex;
  padding: 20px 16px 16px;
  border-radius: 8px;
  border: 1px solid rgb(237, 237, 237);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 4px 8px;
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const GiftName = styled.p`
  font-size: 13px;
  color: rgb(136, 136, 136);
`;

const GiftInfo = styled.p`
  font-size: 14px;
`;