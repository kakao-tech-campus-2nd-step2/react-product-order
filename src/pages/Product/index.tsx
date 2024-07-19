import { Box, Button, Flex, Heading, HStack, Image, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { useAuth } from '@/provider/Auth';

import { Header } from '../../components/features/Layout/Header';

type ProductDetailParams = {
  id: string;
};

type FormValues = {
  quantity: number;
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<ProductDetailParams>();
  const productId = Number(id);
  const navigate = useNavigate(); 
  const authInfo = useAuth(); 

  const { data, isLoading, isError } = useGetProductDetail(productId);
  const { data: optionsData, isLoading: isOptionsLoading, isError: isOptionsError } = useGetProductOptions(productId);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: { quantity: 1 },
  });

  const quantity = watch("quantity");
  
  const giftOrderLimit = optionsData?.giftOrderLimit || 1;

  useEffect(() => {
    setValue('quantity', 1);
  }, [setValue]);

  const onSubmit = (formData: FormValues) => {
    if (!authInfo) {
      navigate('/login');
    } else {
      navigate('/order', { state: { product: data, quantity: formData.quantity } });
    }
  };

  if (isLoading || isOptionsLoading) return <Spinner />;
  if (isError || isOptionsError) return <Text>에러가 발생했습니다.</Text>;
  if (!data || !data.price || !optionsData) return <Text>상품을 찾을 수 없습니다.</Text>;

  const handleIncrease = () => {
    if (quantity < giftOrderLimit) {
      setValue('quantity', quantity + 1);
    } else {
      alert(`최대 주문 가능 수량은 ${giftOrderLimit}개 입니다.`);
    }
  };

  const handleDecrease = () => {
    setValue('quantity', Math.max(1, quantity - 1));
  };

  return (
    <Box>
      <Box position="fixed" top="0" left="0" width="100%" zIndex="1000">
        <Header />
      </Box>
      <Box mt="60px" p={5}>
        <Flex direction="row" align="start" maxWidth="1200px" mx="auto">
          <Box flex="1">
            <Image src={data.imageURL} alt={data.name} boxSize="400px" />
          </Box>
          <VStack flex="2" align="start" spacing={5}>
            <Heading as="h2" size="lg">{data.name}</Heading>
            <Text fontSize="2xl" fontWeight="bold">{data.price.sellingPrice}원</Text>
            <Text>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
            <Box>
              <Text>{data.description}</Text>
            </Box>
          </VStack>
        </Flex>
        <Box mt={10} p={5} borderWidth="1px" borderRadius="lg" maxWidth="1200px" mx="auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <HStack justifyContent="space-between" mb={5}>
              <Text fontSize="xl" fontWeight="bold">{data.name}</Text>
              <HStack>
                <Button onClick={handleDecrease} size="sm">-</Button>
                <Input 
                  {...register('quantity', { 
                    required: "수량을 입력해주세요.", 
                    min: { value: 1, message: "수량은 최소 1개입니다." },
                    max: { value: giftOrderLimit, message: `최대 주문 가능 수량은 ${giftOrderLimit}개 입니다.` }
                  })}
                  readOnly 
                  textAlign="center" 
                  width="50px"
                />
                <Button onClick={handleIncrease} size="sm">+</Button>
              </HStack>
            </HStack>
            {errors.quantity && <Text color="red.500">{errors.quantity.message}</Text>}
            <HStack justifyContent="space-between">
              <Text fontSize="xl" fontWeight="bold">총 결제 금액</Text>
              <Text fontSize="xl" fontWeight="bold">{data.price.sellingPrice * quantity}원</Text>
            </HStack>
            <Button mt={5} bg="yellow.400" color="black" width="full" _hover={{ bg: 'yellow.500' }} type="submit">
              나에게 선물하기
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
