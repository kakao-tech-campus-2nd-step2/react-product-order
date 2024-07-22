import { Box, Button, Center, Flex, Image, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller,useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { authSessionStorage } from '@/utils/storage';

interface ProductDetail {
  id: string;
  name: string;
  imageURL: string;
  price: { sellingPrice: number };
  description: string;
}

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [giftOrderLimit, setGiftOrderLimit] = useState<number | null>(null);
  const navigate = useNavigate();
  const toast = useToast();

  const { control, setValue, watch } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = watch('quantity');

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${productId}/detail`);
        setProduct(response.data.detail);
        setIsLoading(false);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Product not found. Redirecting to home page.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        navigate('/');
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
      }
    };

    fetchProductDetail();
    fetchProductOptions();
  }, [productId, navigate, toast]);

  useEffect(() => {
    if (giftOrderLimit !== null && quantity > giftOrderLimit) {
      setValue('quantity', giftOrderLimit);
    }
  }, [quantity, giftOrderLimit, setValue]);

  if (isLoading || !product) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const handleIncreaseQuantity = () => {
    if (giftOrderLimit === null || quantity < giftOrderLimit) {
      setValue('quantity', quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setValue('quantity', quantity - 1);
    }
  };

  const handleBuyNow = () => {
    const authToken = authSessionStorage.get();
    if (!authToken) {
      if (window.confirm('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하겠습니까?')) {
        navigate('/login', { state: { from: `/product/${productId}` } });
      }
      return;
    }
    const totalPrice = product.price.sellingPrice * quantity;
    navigate(`/checkout/${productId}`, {
      state: { totalPrice, product, quantity },
    });
  };

  return (
    <Flex justifyContent="center" minHeight="100vh" padding="20px">
      <Flex maxW="1200px" width="100%">
        <Box flex="2" p="4">
          <Flex>
            <Image src={product.imageURL} alt={product.name} boxSize="450px" mb="4" />
            <Box ml="4">
              <Text fontSize={'24px'} mt={'24px'}>
                {product.name}
              </Text>
              <Text fontSize={'30px'} mt={'16px'}>
                {product.price.sellingPrice}원
              </Text>
              <Box borderTop="0.5px solid gray" borderBottom="0.5px solid gray" marginTop={30} py="24px" px="12px">
                <Text fontSize={'14px'} fontWeight={'bold'}>
                  카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
        <Box flex="1" p="4" height="760px">
          <Flex direction="column" justifyContent="space-between" height="100%">
            <Box border="0.5px solid gray" padding="14px">
              <Text fontSize="16px" fontWeight="bold">
                {product.name}
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
                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      max={giftOrderLimit ?? 100}
                      onChange={(e) => field.onChange(Math.min(Number(e.target.value), giftOrderLimit || 0))}
                      textAlign="center"
                      mx="2"
                    />
                  )}
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
                  {product.price.sellingPrice * quantity}원
                </Text>
              </Flex>

              <Button
                bgColor="black"
                color="white"
                mt="4"
                onClick={handleBuyNow}
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
    </Flex>
  );
};

export default ProductDetailPage;
