import {
  Box,
  Button,
  Container,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import { useCurrentOption } from '@/api/hooks/useGetOption';
import { useCurrentProduct } from '@/api/hooks/useGetProduct';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

type Props = {
  name: string;
  totalPrice: number;
  giftOrderLimit: number;
};

type FormValues = {
  countControl: number;
};
export const ProductOrderSection = ({ productKey }: { productKey: string }) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      countControl: 1,
    },
  });

  const onSubmit = (data: FormValues) => {
    const isLogin = authSessionStorage.get();
    if (isLogin == null) {
      if (confirm('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?')) {
        return navigate(RouterPath.login);
      }
    } else {
      return navigate(RouterPath.order, {
        state: { productKey: productKey, productCount: data.countControl },
      });
    }
  };
  const [count, setCount] = useState(0);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const navigate = useNavigate();
  const { isRender: isOptionRender, currentOption: currentOption } = useCurrentOption(productKey);
  const { isRender: isProductRender, currentProduct: currentProduct } =
    useCurrentProduct(productKey);

  // 모든 데이터가 로드되었는지 확인
  useEffect(() => {
    if (isProductRender && isOptionRender && currentProduct && currentOption) {
      setAllDataLoaded(true); // 모든 데이터가 로드되면 상태를 true로 설정
    }
  }, [isProductRender, isOptionRender, currentProduct, currentOption]);

  if (!allDataLoaded) {
    // 데이터가 아직 로드되지 않았다면 아무것도 렌더링하지 않거나 로딩 표시.
    return <div>Loading...</div>;
  }

  if (!isProductRender || !isOptionRender) return null;
  if (!currentProduct || !currentOption) {
    return <Navigate to={RouterPath.notFound} />;
  }

  const product: Props = {
    name: currentProduct.name,
    totalPrice: currentProduct.price.sellingPrice * count,
    giftOrderLimit: currentOption.giftOrderLimit,
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" justify="space-between">
          <Box>
            <Text as="b">{product.name}</Text>
            <Controller
              name="countControl"
              control={control}
              render={({ field }) => {
                return (
                  <Box>
                    <NumberInput
                      defaultValue={1}
                      min={0}
                      max={product.giftOrderLimit}
                      onChange={(e) => {
                        field.onChange(e);
                        setCount(field.value);
                      }}
                      value={field.value}
                      name={field.name}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    ;
                  </Box>
                );
              }}
            />
          </Box>
          <Box>
            <Box bg="lightgray" w="100%">
              <Flex justify="space-between">
                <Text as="b">총 결제 금액</Text>
                <Text as="b">{product.totalPrice}</Text>
              </Flex>
            </Box>
            <Button type="submit">나에게 선물하기</Button>
          </Box>
        </Flex>
      </form>
    </Container>
  );
};
