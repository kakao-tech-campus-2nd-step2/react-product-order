import { Box, Button, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const CheckoutPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const handleCheckout = () => {
    // 결제 처리 로직 추가
    console.log(`Product ${productId} has been purchased.`);
  };

  return (
    <Box p="6">
      <Text fontWeight="bold" as="h1" fontSize="2xl">결제 페이지</Text>
      <Text>상품 ID: {productId}</Text>
      <Button colorScheme="teal" mt="4" onClick={handleCheckout}>결제하기</Button>
    </Box>
  );
};

export default CheckoutPage;
