import { Box, Button, Center, Flex, HStack, Image, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useGetProductOptions } from "@/api/hooks/useGetProductOption";
import { useAuth } from '@/provider/Auth';

import { useGetProductDetail } from "../../api/hooks/useGetProductDetail";

export const ProductDetailPage = () => {
  const { productDetail, loading, error, notFound } = useGetProductDetail();
  const { productOptions, loading: optionsLoading } = useGetProductOptions();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
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
          selectedOption: selectedOption !== null ? productOptions.find(option => option.id === selectedOption) : null,
        },
      });
    }
  };

  if (notFound) {
    return <Navigate to="/" />;
  }

  if (loading || optionsLoading) {
    return <Center>Loading...</Center>;
  }

  if (error || !productDetail) {
    return <Center>Error loading product details</Center>;
  }

  const selectedOptionPrice = selectedOption !== null
    ? productOptions.find(option => option.id === selectedOption)?.price
    : productDetail.price.sellingPrice;

  const totalPrice = (selectedOptionPrice ?? productDetail.price.sellingPrice) * productQuantity;

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
              <Select placeholder="옵션을 선택하세요" onChange={(e) => setSelectedOption(Number(e.target.value))}>
                {productOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.key} - {option.price}원</option>
                ))}
              </Select>
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