import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetProductDetail(Number(id));
  const [quantity, setQuantity] = useState(1);

  if (isLoading)
    return (
      <Box textAlign="center">
        <Spinner />
      </Box>
    );
  if (isError) return <Box textAlign="center">에러가 발생했습니다.</Box>;
  if (!data) return <Box textAlign="center">상품을 찾을 수 없습니다.</Box>;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const totalPrice = data.price.sellingPrice * quantity;

  return (
    <Flex direction="column" maxWidth="1800px" margin="auto" padding={4}>
      <Flex direction={{ base: 'column', md: 'row' }} alignItems="start">
        <Image src={data.imageURL} alt={data.name} objectFit="cover" boxSize="450" />
        <VStack spacing={5} align="start" padding={5}>
          <Text width="450px" fontSize="4xl">
            {data.name}
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            {data.price.sellingPrice}원
          </Text>
          <Text>카톡 친구가 아니어도 선물 코드로 선물할 수 있어요!</Text>
        </VStack>
        <VStack spacing={5} padding={5}>
          <Box p={5} mt={10} w="full" border="1px" borderRadius="10px" borderColor="#ccd0d5">
            <Heading as="h2" size="m" marginBottom={5}>
              {data.name}
            </Heading>
            <HStack>
              <Button size="sm" onClick={handleDecrease}>
                -
              </Button>
              <Input readOnly value={quantity} textAlign="center" width="100%" />
              <Button size="sm" onClick={handleIncrease}>
                +
              </Button>
            </HStack>
            <Text fontSize="2xl" fontWeight="bold" mt={4}>
              총 결제 금액: {totalPrice.toLocaleString()}원
            </Text>
          </Box>
          <Button colorScheme="gray" size="lg" width="300px" height="60px">
            나에게 선물하기
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default ProductDetail;
