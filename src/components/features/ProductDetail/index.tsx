import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProduct } from '@/api/hooks/useGetProduct';
import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { breakpoints } from '@/styles/variants';

export const ProductDetail = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const { data } = useGetProduct(productId);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const authInfo = useAuth();

  useEffect(() => {
    if (!data) {
      navigate('/');
    }
  }, [data, navigate]);

  const handleGiftClick = () => {
    if (!authInfo) {
      navigate('/login');
    } else {
      navigate('/order', { state: { productId, count } });
    }
  };

  if (!data) return null;
  const product = data?.detail;

  return (
    <Wrapper>
      <Container>
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Image src={product.imageURL} alt={product.name} boxSize="500px" objectFit="cover" />
          <Box p="30px">
            <Heading as="h1" size="xl">
              {product.name}
            </Heading>
            <Text fontSize="2xl" mt="4">
              {product.price.basicPrice.toLocaleString()}원
            </Text>
            <Text mt="4">카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
          </Box>
          <Box p="30px" maxW="400px">
            <Heading as="h2" size="md">
              수량
            </Heading>
            <NumberInput
              mt="4"
              value={count}
              min={1}
              max={100}
              onChange={(valueString) => setCount(parseInt(valueString))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text mt="4">총 결제 금액 {(product.price.basicPrice * count).toLocaleString()}원</Text>
            <Button mt="4" colorScheme="teal" onClick={handleGiftClick}>
              나에게 선물하기
            </Button>
          </Box>
        </Flex>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
