import { Button, Flex, HStack, Image, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { ZodSchema } from 'zod';
import { z } from 'zod';

import { useAuth } from '@/api/hooks/useAuth';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';

const schema: ZodSchema = z.object({
  quantity: z.number().min(1, '수량은 1 이상이어야 합니다.'),
});

type FormData = z.infer<typeof schema>;

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

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: 1,
    },
  });

  useEffect(() => {
    console.log('Product ID: ', productId);
    console.log('Product Data: ', productData);
    console.log('Product Options:', productOptions);
  }, [productId, productData, productOptions]);

  const handleIncrement = () => {
    const currentQuantity = getValues('quantity');
    if (productOptions && currentQuantity < (productOptions.giftOrderLimit ?? Infinity)) {
      setValue('quantity', currentQuantity + 1);
    }
  };

  const handleDecrement = () => {
    const currentQuantity = getValues('quantity');
    if (currentQuantity > 1) {
      setValue('quantity', currentQuantity - 1);
    }
  };

  const handleQuantityChange = (value: number) => {
    if (value > 0 && value <= (productOptions?.giftOrderLimit ?? Infinity)) {
      setValue('quantity', value);
    }
  };

  const handleGiftClick = (data: FormData) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/order', { state: { productId, initialQuantity: data.quantity } });
    }
  };

  if (isDetailLoading || isOptionsLoading) {
    return <Spinner />;
  }

  if (isDetailError || isOptionsError || !productData) {
    return <Text>상품 정보를 불러오는 데 실패했습니다.</Text>;
  }

  const totalPrice = productData.price.sellingPrice * (getValues('quantity') || 1);

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
            <Button onClick={handleDecrement} disabled={getValues('quantity') <= 1}>
              -
            </Button>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  {...field}
                  min={1}
                  max={productOptions?.giftOrderLimit ?? Infinity}
                  width="60px"
                  textAlign="center"
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
                />
              )}
            />
            <Button
              onClick={handleIncrement}
              disabled={getValues('quantity') >= (productOptions?.giftOrderLimit ?? Infinity)}
            >
              +
            </Button>
          </HStack>
          {errors.quantity && (
            <Text color="red.500">{(errors.quantity as { message?: string })?.message}</Text>
          )}
          <Text fontSize="lg" fontWeight="bold">
            총 결제 금액: {totalPrice}원
          </Text>
          <Button
            colorScheme="blue"
            onClick={handleSubmit(handleGiftClick)}
            disabled={getValues('quantity') > (productOptions?.giftOrderLimit ?? Infinity)}
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
