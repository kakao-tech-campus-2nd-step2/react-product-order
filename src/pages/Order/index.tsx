import React from 'react';
import styled from '@emotion/styled';
import Layout from '@components/features/Layout';
import { Checkbox, Select, Input } from '@chakra-ui/react';
import { CenteredContainer, Button } from '@components/common';
import OrderMessage from '@components/features/Order/OrderMessage';

export default function Order() {
  return (
    <Layout>
      <CenteredContainer maxWidth="lg">
        <InnerContainer>
          <OrderMessage />
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

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 28px;
`;
