import { Button, Flex, HStack, Image, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '@/api/hooks/useAuth';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';

export const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductDetail({ productId: productId ?? '' });
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  useEffect(() => {
    console.log('Product ID: ', productId);
    console.log('Product Data: ', productData);
  }, [productId, productData]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const totalPrice = (productData?.price?.sellingPrice || 0) * quantity;

  const handleGiftClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      console.log('나에게 선물하기 클릭');
      // 실제 선물하기 로직 구현
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !productData) {
    return <Text>상품 정보를 불러오는 데 실패했습니다.</Text>;
  }

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
            <Button onClick={decrementQuantity}>-</Button>
            <Text>{quantity}</Text>
            <Button onClick={incrementQuantity}>+</Button>
          </HStack>
          <Text fontSize="lg" fontWeight="bold">
            총 결제 금액: {totalPrice}원
          </Text>
          <Button colorScheme="blue" onClick={handleGiftClick}>
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
