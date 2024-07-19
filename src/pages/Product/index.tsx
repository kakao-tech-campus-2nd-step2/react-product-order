import React from 'react';
import styled from '@emotion/styled';
import Layout from '@components/features/Layout';
import { Link } from 'react-router-dom';
import { Image, Input, Button, useNumberInput, HStack } from '@chakra-ui/react';
import { CenteredContainer, Container } from '@components/common';
import ProductImage from '@assets/images/goodsItem.jpg';

const IMAGE_SIZE = 450;

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
