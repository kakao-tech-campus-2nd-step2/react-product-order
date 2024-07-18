import { Box, Button, Center, Flex, HStack,Image, Input, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef,useState } from "react";
import { Navigate } from "react-router-dom";

import type { ProductDetailData } from "@/types";

import { getProductDetail } from "../../api/hooks/useGetProductDetail";

export const ProductDetailPage = () => {
  const [productDetail, setProductDetail] = useState<ProductDetailData | null>(null);
  const productIdRef = useRef<number | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const url = window.location.pathname;
    const match = url.match(/\/products\/(\d+)/);
    if (match) {
      productIdRef.current = parseInt(match[1], 10);
    }

    const fetchProductDetail = async () => {
      if (productIdRef.current !== null) {
        try {
          const data = await getProductDetail(productIdRef.current);
          setProductDetail(data);
        } catch (error) {
          setNotFound(true);
        }
      }
    };
    fetchProductDetail();
  }, []);

  if (notFound) {
    return <Navigate to="/" />;
  }

  if (!productDetail) {
    return <Center>Loading...</Center>;
  }

  return (
    <Box p={8}>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box flex="1" mb={{ base: 4, md: 0 }}>
          <Image src={productDetail.imageURL} alt={productDetail.name} boxSize="400px" />
        </Box>
        <Box flex="1" ml={{ md: 8 }}>
          <VStack align="flex-start" spacing={4}>
            <Text fontSize="lg" fontWeight="bold">{productDetail.name}</Text>
            <Text fontSize="xl" color="gray.500">{productDetail.price.sellingPrice}</Text>
            <Text>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
            <HStack>
              <Button>-</Button>
              <Input width="50px" textAlign="center" value={1} readOnly />
              <Button>+</Button>
            </HStack>
            <Text fontSize="lg" fontWeight="bold">총 결제 금액</Text>
            <Text fontSize="2xl" fontWeight="bold">{productDetail.price.sellingPrice}</Text>
            <Button colorScheme="blackAlpha">나에게 선물하기</Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};