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
import { Link, Navigate } from 'react-router-dom';

import { useCurrentProduct } from '@/api/hooks/useGetProduct';
import { RouterPath } from '@/routes/path';

type Props = {
  name: string;
  totalPrice: string;
};

export const ProductOrderSection = ({ productKey }: { productKey: string }) => {
  const { isRender, currentProduct } = useCurrentProduct(productKey);
  if (!isRender) return null;

  if (!currentProduct) {
    return <Navigate to={RouterPath.notFound} />;
  }

  const product: Props = {
    name: currentProduct.name,
    totalPrice: currentProduct.price.sellingPrice,
  };
  return (
    <Flex direction="column" justify="space-between">
      <Box>
        <Text as="b">{product.name}</Text>
        <NumberInput defaultValue={1}>
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
        <Link to={RouterPath.order}>
          <Button w="100%" colorScheme="teal">
            나에게 선물하기
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};
