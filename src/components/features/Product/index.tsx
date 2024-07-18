import { Box, Button, Heading, HStack, Image, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';

type ProductDetailParams = {
  id: string;
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<ProductDetailParams>();
  const productId = Number(id);

  const { data, isLoading, isError } = useGetProductDetail(productId);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <Spinner />;
  if (isError) return <Text>에러가 발생했습니다.</Text>;
  if (!data || !data.price) return <Text>상품을 찾을 수 없습니다.</Text>;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <Box p={5}>
      <HStack spacing={10} alignItems="start">
        <Box flex="1">
          <Image src={data.imageURL} alt={data.name} boxSize="400px" />
        </Box>
        <VStack flex="2" align="start" spacing={5}>
          <Heading as="h2" size="lg">{data.name}</Heading>
          <Text fontSize="2xl" fontWeight="bold">{data.price.sellingPrice}원</Text>
          <Text>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
          <Box>
            <Text>{data.description}</Text>
          </Box>
        </VStack>
      </HStack>
      <Box mt={10} p={5} borderWidth="1px" borderRadius="lg" width="full">
        <HStack justifyContent="space-between" mb={5}>
          <Text fontSize="xl" fontWeight="bold">{data.name}</Text>
          <HStack>
            <Button onClick={handleDecrease} size="sm">-</Button>
            <Input 
              value={quantity} 
              readOnly 
              textAlign="center" 
              width="50px"
            />
            <Button onClick={handleIncrease} size="sm">+</Button>
          </HStack>
        </HStack>
        <HStack justifyContent="space-between">
          <Text fontSize="xl" fontWeight="bold">총 결제 금액</Text>
          <Text fontSize="xl" fontWeight="bold">{data.price.sellingPrice * quantity}원</Text>
        </HStack>
        <Button mt={5} bg="yellow.400" color="black" width="full" _hover={{ bg: 'yellow.500' }}>
          나에게 선물하기
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetail;
