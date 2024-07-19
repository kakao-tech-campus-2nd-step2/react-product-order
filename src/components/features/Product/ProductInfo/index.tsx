import styled from '@emotion/styled';
import React from 'react';
import { Image } from '@chakra-ui/react';
import { Container } from '@components/common';
import ProductImage from '@assets/images/goodsItem.jpg';

const IMAGE_SIZE = 450;

export default function ProductInfo() {
  return (
    <ProductContainer>
      <article>
        <Container justifyContent="space-between">
          <Image src={ProductImage} maxW={IMAGE_SIZE} maxH={IMAGE_SIZE} mr={6} />
          <div>
            <ProductTitle>[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)</ProductTitle>
            <ProductPrice>145000원</ProductPrice>
            <GiftInfo>
              <hr />
              <p>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</p>
              <hr />
            </GiftInfo>
          </div>
        </Container>
      </article>
    </ProductContainer>
  );
}

const ProductContainer = styled.main`
  max-width: 748px;
`;

const ProductTitle = styled.h2`
  font-size: 24px;
  padding-top: 24px;
`;

const ProductPrice = styled.p`
  font-size: 30px;
  padding-top: 16px;
`;

const GiftInfo = styled.div`
  padding-top: 48px;
  font-size: 14px;
  font-weight: 700;

  hr:first-child {
    margin-bottom: 14px;
  }

  hr:last-child {
    margin-top: 14px;
  }
`;
