import React from 'react';
import styled from '@emotion/styled';
import { Image } from '@chakra-ui/react';
import ProductImage from '@assets/images/goodsItem.jpg';

const IMAGE_SIZE = 86;

export default function GiftDetail() {
  return (
    <GiftDetailContainer>
      <Title>선물내역</Title>
      <GiftContainer>
        <Image src={ProductImage} maxW={IMAGE_SIZE} mr={4} />
        <Gift>
          <GiftName>텐바이텐</GiftName>
          <GiftInfo>귀엽게 완성되는 브런치 한상 스누피 레트로 토스터기 X 1개</GiftInfo>
        </Gift>
      </GiftContainer>
    </GiftDetailContainer>
  );
}

const GiftDetailContainer = styled.section``;

const Title = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`;

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

const Gift = styled.div``;

const GiftName = styled.p`
  font-size: 13px;
  color: rgb(136, 136, 136);
`;

const GiftInfo = styled.p`
  font-size: 14px;
`;
