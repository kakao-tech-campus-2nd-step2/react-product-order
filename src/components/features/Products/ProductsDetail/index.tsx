import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useGetProducts } from '@/api/hooks/useGetProducts';
import { useGetProductsOptions } from '@/api/hooks/useGetProductsOptions';
import { Button as CustomButton } from '@/components/common/Button';
import { Image } from '@/components/common/Image';
import { Spinner } from '@/components/common/Spinner';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

type Props = {
  productId: string;
};

export const ProductsDetail = ({ productId }: Props) => {
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProducts(productId);
  const {
    data: productOptionsData,
    isLoading: isProductOptionsLoading,
    isError: isProductOptionsError,
  } = useGetProductsOptions(productId);

  const [itemCount, setItemCount] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(1);
  const authInfo = useAuth();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (isNaN(value)) return;
    if (productOptionsData && itemCount < productOptionsData.giftOrderLimit) {
      setItemCount(value);
    }
  };

  const handleNavigate = () => {
    if (!authInfo) {
      const isTrue = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하겠습니까?');
      if (isTrue) navigate(getDynamicPath.login());
    } else {
      navigate(RouterPath.order, { state: { itemCount, totalPrice, productData } });
    }
  };

  useEffect(() => {
    if (productData) {
      setTotalPrice(itemCount * productData?.price.basicPrice);
    }
  }, [productData, itemCount]);

  if (isProductLoading || isProductOptionsLoading) {
    return (
      <TextView>
        <Spinner />
      </TextView>
    );
  }
  if (isProductError || isProductOptionsError) {
    return <Navigate to={RouterPath.notFound} />;
  } // 상세 페이지가 없으면 홈으로

  return (
    <Wrapper>
      <Grid
        h="30%"
        w="100%"
        templateRows={{ base: 'repeat(4, 0.3fr)', md: 'repeat(2, 1fr)' }}
        templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
        gap={4}
        maxWidth={1000}
      >
        <GridItem rowSpan={1} colSpan={1} style={{ display: 'flex', justifyContent: 'center' }}>
          <Image src={productData?.imageURL}></Image>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <FontWrapper style={{ fontWeight: 'lighter' }}>{productData?.name}</FontWrapper>
          <FontWrapper style={{ marginTop: 10, fontSize: 30 }}>
            {productData?.price.basicPrice} 원
          </FontWrapper>
          <NoKakao>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</NoKakao>
        </GridItem>
        <HiddenGridItem rowSpan={2} colSpan={1} maxWidth="100%" justifyContent={'center'}>
          <ButtonBox>
            <ButtonWrapper>
              <div>{productData?.name}</div>
              <div
                style={{
                  padding: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
              >
                <Button marginRight={5} size="xs" onClick={() => setItemCount(itemCount - 1)}>
                  -
                </Button>
                <Input
                  placeholder={String(itemCount)}
                  width="40%"
                  height={'auto'}
                  value={itemCount}
                  onChange={handleChange}
                />
                <Button marginLeft={5} size="xs" onClick={() => setItemCount(itemCount + 1)}>
                  +
                </Button>
              </div>
            </ButtonWrapper>
          </ButtonBox>
          <PriceBox>
            <div
              style={{
                width: '80%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 10,
              }}
            >
              <div>총 결제 금액 </div>
              <div>{totalPrice}</div>
            </div>
            <CustomButton
              theme="black"
              size="large"
              style={{ maxWidth: '80%' }}
              onClick={handleNavigate}
            >
              나에게 선물하기
            </CustomButton>
          </PriceBox>
        </HiddenGridItem>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const FontWrapper = styled.div`
  font-size: 20px;
`;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid lightgray;
  width: 80%;
  padding: 16px;
  border-radius: 8px;
  height: 30%;
`;

const ButtonBox = styled(Box)`
  heigh: 30%;
  display: flex;
  justify-content: center;
  @media (min-width: ${breakpoints.md}) {
    height: 60%;
  }
`;

const PriceBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50%;
  flex-direction: column;
  gap: 10px;
  @media (min-width: ${breakpoints.md}) {
    height: 30%;
  }
`;

const NoKakao = styled.div`
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: flex-start;
  margin-top: 50px;
  padding: 20px;
`;

const HiddenGridItem = styled(GridItem)`
  @media (max-width: ${breakpoints.sm}) {
    display: none;
  }
`;