import { Box, Button, Flex, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getDynamicPath, RouterPath } from '@/routes/path'
import { authSessionStorage } from '@/utils/storage';

interface ProductDetail {
  id: number;
  name: string;
  imageURL: string;
  price: {
    basicPrice: number;
  };
  giftOrderLimit?: number;
}

const fetchProductDetails = async (productId: string) => {
  try {
    const response = await axios.get(`https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${productId}/detail`);
    const optionsResponse = await axios.get(`https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${productId}/options`);
    return {
      detail: response.data.detail,
      options: optionsResponse.data.options
    };
  } catch (error) {
    throw error;
  }
};

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    fetchProductDetails(productId)
      .then(data => {
        if (data) {
          setProductDetail({...data.detail, giftOrderLimit: data.options.giftOrderLimit});
        } else {
          setFetchError(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product details:', err);
        setFetchError(true);
        setLoading(false);
      });
  }, [productId]);


  const handleGiftToSelf = () => {
    const authToken = authSessionStorage.get();
    if (!authToken) {
      navigate(RouterPath.login);
      return;
    }


    if (productId) {
        if (productDetail) {
        navigate(getDynamicPath.order(productId), {
            state : {
                name: productDetail.name,
                imageURL : productDetail.imageURL,
                price: productDetail.price.basicPrice,
                quantity,
                totalPrice: productDetail.price.basicPrice * quantity
      }
    }
          );
        }
    } else {
      navigate(RouterPath.home);
    }
  };

  if (loading) {
    return <Box textAlign="center" py="20"><Text>Loading...</Text></Box>;
  }

  if (fetchError) {
    return (
      <Box textAlign="center" py="20">
        <Text>Product not found. Please return to the </Text>
        <Link to="/" color="teal.500">Home Page</Link>
      </Box>
    );
  }

  if (!productDetail) {
    return <Box textAlign="center" py="20"><Text>No product details available.</Text></Box>;
  }

  const handleQuantityChange = (_valueAsString: string, valueAsNumber: number) => {
    if (valueAsNumber >= 1 && valueAsNumber <= (productDetail?.giftOrderLimit || 1)) {
      setQuantity(valueAsNumber);
    }
  };

  return (
    <Flex p={5} align="center" justify="center" wrap="wrap">
      <Box flex="1" p={5} maxWidth="500px">
        <Image src={productDetail.imageURL} alt={productDetail.name} boxSize="full" objectFit="cover" />
      </Box>
      <VStack flex="1" align="start" p={5} spacing={4} maxWidth="500px">
        <Text fontSize="3xl" fontWeight="bold">{productDetail.name}</Text>
        <Text fontSize="2xl">{productDetail.price.basicPrice}원</Text>
        <Text>카톡 친구가 아니어도 선물 코드로 선물할 수 있어요!</Text>
        <NumberInput size="sm" defaultValue={1} min={1} max={productDetail.giftOrderLimit} value={quantity} onChange={handleQuantityChange}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Flex width="full" justify="space-between" align="center">
          <Text fontSize="2xl" fontWeight="semibold">총 결제금액</Text>
          <Text fontSize="2xl">{(productDetail.price.basicPrice * quantity).toLocaleString()}원</Text>
        </Flex>
        <Button colorScheme="gray" size="lg" width="full" onClick={handleGiftToSelf}>나에게 선물하기</Button>
      </VStack>
    </Flex>
  );
};
