// src/ProductPaymentPage.tsx
import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Image,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { RouterPath } from '@/routes/path';
import { useAuth } from '@/provider/Auth';

interface ProductPaymentPageProps {
  isLoggedIn: boolean;
  product: {
    imageUrl: string;
    name: string;
    price: number;
  } | null;
}

export const ProductPage: React.FC<ProductPaymentPageProps> = ({ product }) => {
  const { productKey = '' } = useParams<{ productKey: string }>();
  const [quantity, setQuantity] = useState<number>(1);
  const authInfo = useAuth();

  const handleGiftToMyself = () => {
    if (!authInfo) {
      <Navigate to={RouterPath.login} />;
    } else {
      console.log('나에게 선물하기');
    }
  };

  if (!product) {
    <Navigate to={RouterPath.home} />;
    return null;
  }

  return (
    <Box p={5}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Image src={product.imageUrl} alt={product.name} boxSize="300px" />
        <Text fontSize="2xl" mt={4}>
          {product.name}
        </Text>
        <Text fontSize="xl" color="gray.500">
          {product.price}원
        </Text>
        <NumberInput
          mt={4}
          value={quantity}
          onChange={(valueString) => setQuantity(parseInt(valueString, 10))}
          min={1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button mt={4} colorScheme="blue" onClick={handleGiftToMyself}>
          나에게 선물하기
        </Button>
      </Box>
    </Box>
  );
};
