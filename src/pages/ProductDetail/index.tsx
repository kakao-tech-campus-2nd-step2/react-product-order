import { Button, Flex, HStack, Image, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@/api/hooks/useAuth';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';

export const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const {
    data: productData,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useGetProductDetail({ productId: productId ?? '' });
  const {
    data: productOptions,
    isLoading: isOptionsLoading,
    isError: isOptionsError,
  } = useGetProductOptions(productId ?? '');
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    console.log('Product ID: ', productId);
    console.log('Product Data: ', productData);
    console.log('Product Options:', productOptions);
  }, [productId, productData, productOptions]);

  const handleIncrement = () => {
    if (productOptions && quantity < (productOptions.giftOrderLimit ?? Infinity)) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0 && value <= (productOptions?.giftOrderLimit ?? Infinity)) {
      setQuantity(value);
    }
  };

  const handleGiftClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/order', { state: { productId, initialQuantity: quantity } });
    }
  };

  if (isDetailLoading || isOptionsLoading) {
    return <Spinner />;
  }

  if (isDetailError || isOptionsError || !productData) {
    return <Text>상품 정보를 불러오는 데 실패했습니다.</Text>;
  }

  const totalPrice = productData.price.sellingPrice * quantity;

  return (
    <Flex padding="4" justifyContent="center">
      <HStack align="start" spacing="8">
        <Image src={productData.imageURL} alt={productData.name} boxSize="450px" />
        <VStack align="start" spacing="4">
          <Text fontSize="2xl" fontWeight="bold">
            {productData.name}
          </Text>
          <Text fontSize="lg">{productData.brandInfo.name}</Text>
          <Text fontSize="lg">{productData.price.sellingPrice}원</Text>
          <HStack>
            <Button onClick={handleDecrement} disabled={quantity <= 1}>
              -
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={productOptions?.giftOrderLimit ?? Infinity}
              width="60px"
              textAlign="center"
            />
            <Button
              onClick={handleIncrement}
              disabled={quantity >= (productOptions?.giftOrderLimit ?? Infinity)}
            >
              +
            </Button>
          </HStack>
          <Text fontSize="lg" fontWeight="bold">
            총 결제 금액: {totalPrice}원
          </Text>
          <Button
            colorScheme="blue"
            onClick={handleGiftClick}
            disabled={quantity > (productOptions?.giftOrderLimit ?? Infinity)}
          >
            나에게 선물하기
          </Button>
          <VStack spacing={2} align="stretch" width="full">
            {productData.productDescription?.images?.map((image, index) => (
              <Image key={index} src={image} alt={`Product description ${index + 1}`} />
            ))}
          </VStack>
        </VStack>
      </HStack>
    </Flex>
  );
};
