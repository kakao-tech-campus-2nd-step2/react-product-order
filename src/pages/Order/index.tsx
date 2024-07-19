import React from 'react';
import styled from '@emotion/styled';
import Layout from '@components/features/Layout';
import { Textarea, Image, Checkbox, Select, Input } from '@chakra-ui/react';
import { CenteredContainer, Button } from '@components/common';
import ProductImage from '@assets/images/goodsItem.jpg';

const IMAGE_SIZE = 86;

export default function Order() {
  return (
    <Layout>
      <CenteredContainer maxWidth="lg">
        <InnerContainer>
          <OrderContainer>
            <OrderMessage>
              <Title>나에게 주는 선물</Title>
              <Textarea placeholder="선물과 함께 보낼 메시지를 적어보세요" />
            </OrderMessage>
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
          </OrderContainer>
          <PaymentContainer>
            <Title>결제정보</Title>
            <PaymentForm>
              <Checkbox mb={4} fontWeight={700}>
                현금영수증 신청
              </Checkbox>
              <Select mb={2}>
                <option value="개인소득공제">개인소득공제</option>
                <option value="사업자증빙용">사업자증빙용</option>
              </Select>
              <Input placeholder="(-없이) 숫자만 입력해주세요." mb={4} />
            </PaymentForm>
            <TotalAmount>
              <dl>
                <dt>최종 결제금액</dt>
                <dd>49900원</dd>
              </dl>
            </TotalAmount>
            <Button theme="kakao">49900원 결제하기</Button>
          </PaymentContainer>
        </InnerContainer>
      </CenteredContainer>
    </Layout>
  );
}

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 80px;
  height: 100vh;
`;

const OrderContainer = styled.main`
  width: 850px;
  padding: 48px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 28px;
`;

const OrderMessage = styled.section`
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

const PaymentContainer = styled.aside`
  width: 360px;
`;

const PaymentForm = styled.div``;

const TotalAmount = styled.div`
  padding: 18px 20px;
  border-radius: 4px;
  background-color: rgb(245, 245, 245);
  margin-bottom: 20px;

  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
  }

  dt {
    font-size: 14px;
  }

  dd {
    font-size: 20px;
  }
`;
