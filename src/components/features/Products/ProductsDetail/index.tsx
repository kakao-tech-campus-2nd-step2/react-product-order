import { Box, Button, Grid, GridItem, Input, Text } from '@chakra-ui/react';
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Controller,useForm } from 'react-hook-form';
import { Navigate, useNavigate } from "react-router-dom";

import { useGetProductsInfo } from "@/api/hooks/useGetProductsInfo";
import { Button as CustomBtn } from "@/components/common/Button";
import { Image } from "@/components/common/Image";
import { Spinner } from "@/components/common/Spinner";
import { useAuth } from "@/provider/Auth";
import { getDynamicPath, RouterPath } from "@/routes/path";

type Props = {
  productId: string;
}

type FormValues = {
  itemCount: number;
}

export const ProductsDetail = ({ productId }: Props) => {
  const { data: productData, isLoading, isError } = useGetProductsInfo(productId);
  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: { itemCount: 1 }
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const authInfo = useAuth();
  const navigate = useNavigate();

  const watchItemCount = watch('itemCount');
  const giftOrderLimit = productData?.options?.giftOrderLimit ?? 0;

  const onSubmit = (formValues: FormValues) => {
    if (!authInfo) {
      const check = window.confirm('로그인이 필요한 서비스 입니다. 로그인 페이지로 이동하시겠습니까?');
      if (check) {
        navigate(getDynamicPath.login());
      }
    } else {
      navigate(RouterPath.order, { state: { itemCount: formValues.itemCount, totalPrice, data: productData } });
    }
  };

  useEffect(() => {
    if (productData) {
      const newTotalPrice = productData.detail.price.basicPrice * watchItemCount;
      setTotalPrice(newTotalPrice);
      console.log(`상품명: ${productData.detail.name} / 선물 최대 제한 수량: ${giftOrderLimit}`);
    }
  }, [productData, watchItemCount, giftOrderLimit]);

  if (isLoading) {
    return (
      <CenteredBox>
        <Spinner />
      </CenteredBox>
    );
  }

  if (isError) {
    return (
      <Navigate to={RouterPath.notFound} />
    );
  }

  const handleChange = (value: number) => {
    if (value > giftOrderLimit) {
      alert(`최대 선물 가능 수량은 ${giftOrderLimit}개 입니다.`);
      setValue('itemCount', giftOrderLimit);
    } else {
      setValue('itemCount', value);
    }
  };

  const handleIncrement = () => {
    if (watchItemCount < giftOrderLimit) {
      setValue('itemCount', watchItemCount + 1);
    } else {
      alert(`최대 선물 가능 수량은 ${giftOrderLimit}개 입니다.`);
    }
  };

  const handleDecrement = () => {
    if (watchItemCount > 1) {
      setValue('itemCount', watchItemCount - 1);
    }
  };

  return (
    <Wrapper>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 2fr' }}
        gap={6}
        maxWidth={1200}
        mx="auto"
        p={4}
      >
        <GridItem>
          <Image src={productData?.detail?.imageURL} alt={productData?.detail?.name} />
        </GridItem>

        <GridItem>
          <Box>
            <Text fontSize="2xl" fontWeight="bold">{productData?.detail?.name}</Text>
            <Text fontSize="xl" color="gray.600">{productData?.detail?.price.basicPrice} 원</Text>
            <Text mt={4} fontSize="md" color="gray.500">
              카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
            </Text>
          </Box>

          <Box mt={6}>
            <QuantityControl>
              <Button size="sm" onClick={handleDecrement}>-</Button>
              <Controller
                name="itemCount"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    width="60px"
                    textAlign="center"
                    {...field}
                    onChange={(e) => handleChange(Number(e.target.value))}
                    mx={2}
                    min={1}
                  />
                )}
              />
              <Button size="sm" onClick={handleIncrement}>+</Button>
            </QuantityControl>
          </Box>

          <Box mt={6} display="flex" justifyContent="space-between" alignItems="center">
            <Text fontSize="lg">총 결제 금액</Text>
            <Text fontSize="2xl" fontWeight="bold">{totalPrice} 원</Text>
          </Box>

          <Box mt={6}>
            <CustomBtn theme="black" size="large" onClick={handleSubmit(onSubmit)}>
              나에게 선물하기
            </CustomBtn>
          </Box>
        </GridItem>
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const CenteredBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

export default ProductsDetail;
