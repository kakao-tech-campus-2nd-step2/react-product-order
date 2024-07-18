import { Box, Button, HStack, Image, Input, Text, useNumberInput, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";

import { useGetProductDetail } from "@/api/hooks/useGetProductDetail";
import { Spinner } from "@/components/common/Spinner";
import { getDynamicPath } from "@/routes/path";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const validProductId = productId || "";
  const [data, { loading, errorMessage }] = useGetProductDetail(validProductId);

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (data) {
      setTotalPrice(data.detail.price.sellingPrice * quantity);
    }
  }, [data, quantity]);

  useEffect(() => {
    if (!loading && (errorMessage || !data)) {
      navigate(getDynamicPath.home());
    }
  }, [data, errorMessage, loading, navigate]);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    onChange: (_, valueAsNumber) => setQuantity(valueAsNumber),
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  if (loading) {
    return (
      <TextView>
        <Spinner />
      </TextView>
    );
  }

  return (
    <Box maxW="7xl" mx="auto" p={4}>
      <HStack spacing={10} align="start">
        <Box flex="1">
          <VStack align="start" spacing={4} flex="2">
            <Image
              src={data?.detail.imageURL}
              alt="Product Image"
              boxSize="500px"
              objectFit="cover"
            />
          </VStack>
        </Box>
        <VStack align="start" spacing={4} flex="1">
          <Text fontSize="2xl" fontWeight="bold">{data?.detail.name}</Text>
          <Text fontSize="lg" color="gray.600">{data?.detail.price.sellingPrice}원</Text>
          <Box w="100%" borderTop="1px" borderBottom="1px" borderColor="gray.200" py={4}>
            <Text fontSize="xs" color="gray.600" fontWeight="bold">카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
          </Box>
        </VStack>
        <VStack align="start" spacing={4} flex="1">
          <Box borderColor="gray.200" borderWidth="1px" p="10px" borderRadius='md'>
            <Text fontWeight="bold" >{data?.detail.name}</Text>
            <HStack maxW="320px" spacing={4}>
              <Button {...dec}>-</Button>
              <Input {...input} />
              <Button {...inc}>+</Button>
            </HStack>
          </Box>
          <HStack w="100%" justifyContent="space-between">
            <Text fontSize="xs" fontWeight="bold">총 결제 금액</Text>
            <Text fontSize="2xl" fontWeight="bold">{totalPrice}원</Text>
          </HStack>
          <Link to={getDynamicPath.order(productId || "")} key={productId}
          state={{
            data: {
              options: {
                productName: data?.detail.name,
                productPrice: totalPrice,
              },
            },
            loading: false,
            errorMessage: '',
          }}
          >
            <Button bg="black" color="white" w="90%" h="50px" fontSize="sm">나에게 선물하기</Button>
          </Link>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ProductDetailPage;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
