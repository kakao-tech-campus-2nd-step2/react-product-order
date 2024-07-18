import { Box, Button, Center, Flex, HStack,Image, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from '@/provider/Auth';

import { useGetProductDetail } from "../../api/hooks/useGetProductDetail";

export const ProductDetailPage = () => {
  const { productDetail, loading, error, notFound } = useGetProductDetail();
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const authInfo = useAuth();

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductQuantity(Number(event.target.value));
  };

  const handleOrder = (event: React.FormEvent) => {
    event.preventDefault();
    if (!authInfo) {
      navigate(`/login?redirect=${window.location.pathname}`);
      return;
    }

    if (productDetail) {
      navigate("/order", {
        state: {
          productDetail,
          productQuantity,
        },
      });
    }
  };

  if (notFound) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <Center>Loading...</Center>;
  }

  if(error || !productDetail) {
    return <Center>Error loading product details</Center>;
  }

  const totalPrice = productDetail.price.sellingPrice * productQuantity;

  return (
    <Box p={8}>
      <form onSubmit={handleOrder}>
        <Flex direction={{ base: "column", md: "row" }}>
          <Box flex="1" mb={{ base: 4, md: 0 }}>
            <Image src={productDetail.imageURL} alt={productDetail.name} boxSize="400px" />
          </Box>
          <Box flex="1" ml={{ md: 8 }}>
            <VStack align="flex-start" spacing={4}>
              <Text fontSize="lg" fontWeight="bold">{productDetail.name}</Text>
              <Text fontSize="xl" color="gray.500">{productDetail.price.sellingPrice}원</Text>
              <Text>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
              <HStack>
                <Button type="button" onClick={() => setProductQuantity(prev => Math.max(1, prev - 1))}>-</Button>
                <Input
                  width="50px"
                  textAlign="center"
                  value={productQuantity}
                  onChange={handleQuantityChange}
                  type="number"
                  min="1"
                />
                <Button type="button" onClick={() => setProductQuantity(prev => prev + 1)}>+</Button>
              </HStack>
              <Text fontSize="lg" fontWeight="bold">총 결제 금액</Text>
              <Text fontSize="2xl" fontWeight="bold">{totalPrice}원</Text>
              <Button type="submit" colorScheme="blackAlpha">나에게 선물하기</Button>
            </VStack>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};