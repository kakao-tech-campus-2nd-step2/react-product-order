import {
  Box,
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useCurrentOption } from '@/api/hooks/useGetOption';
import { useCurrentProduct } from '@/api/hooks/useGetProduct';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

type Props = {
  name: string;
  totalPrice: number;
  giftOrderLimit: number;
};

export const ProductOrderSection = ({ productKey }: { productKey: string }) => {
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

  const loginCheck = (e: { preventDefault: () => void }) => {
    const isLogin = authSessionStorage.get();
    if (isLogin == null) {
      e.preventDefault();
      if (confirm('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?')) {
        return navigate(RouterPath.login);
      }
    }
  };

  return (
    <Flex direction="column" justify="space-between">
      <Box>
        <Text as="b">{product.name}</Text>
        <NumberInput
          defaultValue={1}
          min={0}
          max={product.giftOrderLimit}
          value={count}
          onChange={(value) => setCount(Number(value))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Box>
        <Box bg="lightgray" w="100%">
          <Flex justify="space-between">
            <Text as="b">총 결제 금액</Text>
            <Text as="b">{product.totalPrice}</Text>
          </Flex>
        </Box>
        <Link
          to={RouterPath.order}
          onClick={loginCheck}
          state={{ productKey: productKey, productCount: count }}
        >
          <Button w="100%" colorScheme="teal">
            나에게 선물하기
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};
