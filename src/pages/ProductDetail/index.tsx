import { Box, Button, Center, Flex, HStack, Image, Input, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useGetProductOptions } from "@/api/hooks/useGetProductOption";
import { useAuth } from '@/provider/Auth';

import { useGetProductDetail } from "../../api/hooks/useGetProductDetail";

export const ProductDetailPage = () => {
  const { productDetail, loading, notFound } = useGetProductDetail();
  const { productOption, loading: optionsLoading } = useGetProductOptions();
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const authInfo = useAuth();

  useEffect(() => {
    console.log('Product Option:', productOption);
  }, [productOption]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = Number(value);

    if (value === "" || (numberValue > 0 && numberValue <= (productOption?.giftOrderLimit || Infinity))) {
      setProductQuantity(numberValue);
    } else if (productOption && numberValue > productOption.giftOrderLimit) {
      setProductQuantity(productOption.giftOrderLimit);
      alert(`최대 주문 가능 수량은 ${productOption.giftOrderLimit}개 입니다.`);
    }
  };

  const handleIncreaseQuantity = () => {
    if (productOption && productQuantity < productOption.giftOrderLimit) {
      setProductQuantity(prev => prev + 1);
    } else if (productOption) {
      alert(`최대 주문 가능 수량은 ${productOption.giftOrderLimit}개 입니다.`);
    }
  };

  const handleDecreaseQuantity = () => {
    setProductQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleOrder = (event: React.FormEvent) => {
    event.preventDefault();
    const numberQuantity = productQuantity;

    console.log('Product Option in Order:', productOption);

    if (!authInfo) {
      navigate(`/login?redirect=${window.location.pathname}`);
      return;
    }

    if (!productOption) {
      alert("상품 옵션 정보를 로드하는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (numberQuantity > productOption.giftOrderLimit) {
      alert(`최대 주문 가능 수량은 ${productOption.giftOrderLimit}개 입니다.`);
      setProductQuantity(productOption.giftOrderLimit);
      return;
    }

    // 상품 상세 정보를 주문 상태로 전달
    if (productDetail) {
      navigate("/order", {
        state: {
          productDetail,  // 상품 상세 정보
          productQuantity: numberQuantity,
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

  if (!productDetail) {
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
                <Button
                  type="button"
                  onClick={handleDecreaseQuantity}
                  disabled={productQuantity <= 1}
                >
                  -
                </Button>
                <Input
                  width="50px"
                  textAlign="center"
                  value={productQuantity}
                  onChange={handleQuantityChange}
                  type="number"
                  min="1"
                />
                <Button
                  type="button"
                  onClick={handleIncreaseQuantity}
                  disabled={!productOption || productQuantity >= productOption.giftOrderLimit}
                >
                  +
                </Button>
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