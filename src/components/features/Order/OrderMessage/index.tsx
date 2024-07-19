import React from 'react';
import styled from '@emotion/styled';
import { Textarea, Image } from '@chakra-ui/react';
import ProductImage from '@assets/images/goodsItem.jpg';

const IMAGE_SIZE = 86;

export default function OrderMessage() {
  return (
    <OrderMessageContainer>
      <Message>
        <Title>나에게 주는 선물</Title>
        <Textarea placeholder="선물과 함께 보낼 메시지를 적어보세요" />
      </Message>
      <GiftDetails>
        <Title>선물내역</Title>
        <Gift>
          <Image src={ProductImage} maxW={IMAGE_SIZE} mr={4} />
          <GiftDetail>
            <GiftName>텐바이텐</GiftName>
            <GiftInfo>귀엽게 완성되는 브런치 한상 스누피 레트로 토스터기 X 1개</GiftInfo>
          </GiftDetail>
        </Gift>
      </GiftDetails>
    </OrderMessageContainer>
  );
}

const OrderMessageContainer = styled.main`
  width: 850px;
  padding: 48px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 28px;
`;

const Message = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
`;

const GiftDetails = styled.section``;

const Gift = styled.div`
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

const GiftDetail = styled.div``;

const GiftName = styled.p`
  font-size: 13px;
  color: rgb(136, 136, 136);
`;

const GiftInfo = styled.p`
  font-size: 14px;
`;
