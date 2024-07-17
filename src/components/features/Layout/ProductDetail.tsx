import { Box, Button, Flex, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from '@chakra-ui/react';
import { useState } from 'react';

import useProductDetail from '../../../api/hooks/useProductDetail';

interface ProductDetailProps {
  productKey: string;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ productKey }) => {
  const productDetail = useProductDetail(productKey);
  const [quantity, setQuantity] = useState<number>(1);

  if (!productDetail) {
    return <Text>로딩 중...</Text>;
  }

  const handleQuantityChange = (value: string) => {
    setQuantity(Number(value));
  };

  return (
    <Box p={4}>
      <Flex direction={{ base: 'column', md: 'row' }} align="center">
        <Image src={productDetail.imageUrl} alt={productDetail.name} boxSize="300px" objectFit="cover" />
        <Box ml={{ md: 4 }}>
          <Text fontSize="2xl" fontWeight="bold">{productDetail.name}</Text>
          <Text fontSize="xl" color="gray.500">{productDetail.price}원</Text>
          <Text mt={4}>{productDetail.description}</Text>
          <Flex mt={4} align="center">
            <NumberInput value={quantity} onChange={(valueString) => handleQuantityChange(valueString)} min={1} max={99}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Button mt={4} colorScheme="teal">나에게 선물하기</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductDetail;
