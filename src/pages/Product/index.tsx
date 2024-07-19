import { Box, Button, Center, Flex, Image, Input, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getDynamicPath, RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

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
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [giftOrderLimit, setGiftOrderLimit] = useState<number | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${productId}/detail`,
        );
        const data = response.data.detail;

        if (!data) {
          navigate(RouterPath.home);
          return;
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

    const fetchProductOptions = async () => {
      try {
        const response = await axios.get(
          `https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${productId}/options`,
        );
        const options = response.data.options;
        setGiftOrderLimit(options.giftOrderLimit);
      } catch (error) {
        console.error('Error fetching product options:', error);
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 500) {
            navigate(RouterPath.home);
          } else {
            console.error('Error fetching product detail:', error.response?.statusText);
          }
        } else {
          console.error('Error fetching product detail:', error);
        }
      }
    };

    fetchProductDetail();
    fetchProductOptions();
  }, [productId, navigate]);

  useEffect(() => {
    if (giftOrderLimit !== null && quantity > giftOrderLimit) {
      setQuantity(giftOrderLimit);
    }
  }, [quantity, giftOrderLimit]);

  if (isLoading || !productDetail) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const handleIncreaseQuantity = () => {
    if (giftOrderLimit === null || quantity < giftOrderLimit) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = () => {
    const authToken = authSessionStorage.get();
    if (!authToken) {
      navigate(RouterPath.login);
      return;
    }

    if (productId) {
      const totalPrice = productDetail!.price.basicPrice * quantity;
      navigate(getDynamicPath.order(productId), {
        state: totalPrice,
      });
    } else {
      console.error('ProductId is undefined');
    }
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
                onChange={(e) =>
                  setQuantity(
                    Number(e.target.value) > 0
                      ? Math.min(Number(e.target.value), giftOrderLimit || 0)
                      : 0,
                  )
                }
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
