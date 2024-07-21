import { Box, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface Product {
  imageURL: string;
  name: string;
  brand: string;
}

export const OrderPage: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product as Product;

  if (!product) {
    return <div>상품 정보가 없습니다.</div>;
  }

  return (
    <Box p={5}>
      <VStack spacing={5} alignItems="center">
        <Image src={product.imageURL} alt={product.name} boxSize="300px" />
        <Text fontSize="2xl" fontWeight="bold">
          {product.brand}
        </Text>
        <Text fontSize="xl">{product.name}</Text>
      </VStack>
    </Box>
  );
};
