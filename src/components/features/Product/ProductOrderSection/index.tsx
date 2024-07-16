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
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useCurrentProduct } from '@/api/hooks/useGetProduct';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

type Props = {
  name: string;
  totalPrice: string;
};

export const ProductOrderSection = ({ productKey }: { productKey: string }) => {
  const [count, setCount] = useState(0);
  const { isRender, currentProduct } = useCurrentProduct(productKey);

  if (!isRender) return null;
  if (!currentProduct) {
    return <Navigate to={RouterPath.notFound} />;
  }

  const product: Props = {
    name: currentProduct.name,
    totalPrice: currentProduct.price.sellingPrice,
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
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
        <NumberInput defaultValue={1} value={count} onChange={(value) => setCount(Number(value))}>
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
