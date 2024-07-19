import React from 'react';
import styled from '@emotion/styled';
import Layout from '@components/features/Layout';
import { Link } from 'react-router-dom';
import { Input, Button, useNumberInput, HStack } from '@chakra-ui/react';
import { CenteredContainer } from '@components/common';
import ProductInfo from '@components/features/Product/ProductInfo';

export default function Product() {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Layout>
      <CenteredContainer maxWidth="lg">
        <InnerContainer>
          <ProductInfo />
          <ProductOrderContainer>
            <QuantitySelector>
              <Title>[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)</Title>
              <HStack maxW="320px">
                <Button {...dec}>-</Button>
                <Input {...input} />
                <Button {...inc}>+</Button>
              </HStack>
            </QuantitySelector>
            <div>
              <TotalAmount>
                <dl>
                  <dt>총 결제 금액</dt>
                  <dd>145000원</dd>
                </dl>
              </TotalAmount>
              <Link to="/order">
                <Button type="button">나에게 선물하기</Button>
              </Link>
            </div>
          </ProductOrderContainer>
        </InnerContainer>
      </CenteredContainer>
    </Layout>
  );
}

const InnerContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: space-between;
  padding-top: 100px;
`;

const ProductOrderContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 360px;
`;

const QuantitySelector = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 14px 16px;
  border: 1px solid rgb(237, 237, 237);
  border-radius: 2px;
`;

const Title = styled.p`
  font-weight: 700;
  margin-bottom: 12px;
`;

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
