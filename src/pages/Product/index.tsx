import { Box, Button, Center, Flex, Image, Input, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { RouterPath } from '@/routes/path';

interface ProductDetail {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
  };
}

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${productId}/detail`,
        );
        const data = response.data.detail;

        if (!data) {
          <Link to={RouterPath.home} />;
        }
        setProductDetail({
          id: data.id,
          name: data.name,
          imageURL: data.imageURL,
          price: {
            basicPrice: data.price.basicPrice,
          },
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (isLoading || !productDetail) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = () => {
    const totalPrice = productDetail!.price.basicPrice * quantity;
    alert(`구매가 완료되었습니다! 총 ${totalPrice}원을 결제하셨습니다.`);
    // 여기에 추가적인 로직 구현 가능
  };

  return (
    <Flex direction="row" minHeight="100vh">
      <Box p="4" flex="2">
        <Flex>
          <Image src={productDetail.imageURL} alt={productDetail.name} boxSize="450px" mb="4" />

          <Box ml="4">
            <Text fontSize={'24px'} mt={'24px'}>
              {productDetail.name}
            </Text>
            <Text fontSize={'30px'} mt={'16px'}>
              {productDetail.price.basicPrice}원
            </Text>
            <Box borderTop="0.5px solid gray" borderBottom="0.5px solid gray" py="24px" px="12px">
              <Text fontSize={'14px'} fontWeight={'bold'}>
                카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>

      <Box p="4" flex="1" height="760px" padding="15px">
        <Flex direction="column" justifyContent="space-between" height="100%">
          <Box border="0.5px solid gray" padding="14px">
            <Text fontSize="16px" fontWeight="bold">
              {productDetail.name}
            </Text>
            <Flex justifyContent="space-between" alignItems="center" mt="2">
              <Button
                onClick={handleDecreaseQuantity}
                width="40px"
                height="40px"
                boxSizing="border-box"
              >
                -
              </Button>
              <Input
                type="number"
                value={quantity}
                min={1}
                max={100}
                onChange={(e) => setQuantity(Number(e.target.value))}
                textAlign="center"
                mx="2"
              />
              <Button
                onClick={handleIncreaseQuantity}
                width="40px"
                height="40px"
                boxSizing="border-box"
              >
                +
              </Button>
            </Flex>
          </Box>
          <Box>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              bgColor="#F5F5F5"
              padding="20px"
            >
              <Text fontSize="14px" fontWeight="bold">
                총 결제 금액
              </Text>
              <Text fontSize="20px" fontWeight="bold">
                {productDetail.price.basicPrice * quantity}원
              </Text>
            </Flex>

            <Button
              bgColor="black"
              color="white"
              mt="4"
              onClick={handleSubmit}
              width="100%"
              height="60px"
              boxSizing="border-box"
            >
              나에게 선물하기
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
