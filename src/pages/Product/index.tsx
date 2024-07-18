import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Image, Input, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetThemeProductDetail } from '@/api/hooks/useGetThemeProductDetail';
import { useGetThemeProductOption } from '@/api/hooks/useGetThemeProductOption';
import { Container } from '@/components/common/layouts/Container';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

type FormData = {
  quantity: number;
};

export const ProductPage = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const { data: productData } = useGetThemeProductDetail(productId);
  const { data: optionData } = useGetThemeProductOption(productId);

  const navigate = useNavigate();
  const authInfo = useAuth();

  const detail = productData?.detail;
  const orderLimit = optionData?.options.giftOrderLimit || 0;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { quantity: 1 },
  });

  const price = detail?.price?.basicPrice ?? 0;
  const quantity = watch('quantity');
  const totalPrice = price * quantity;

  const handleIncrease = () => setValue('quantity', quantity + 1);
  const handleDecrease = () => setValue('quantity', quantity > 1 ? quantity - 1 : 1);

  const onSubmit = () => {
    if (!authInfo) {
      const redirectUrl = getDynamicPath.product(productId);
      navigate(getDynamicPath.login(redirectUrl));
    } else {
      navigate(RouterPath.order, {
        state: { name: detail?.name, imageURL: detail?.imageURL, totalPrice: totalPrice },
      });
    }
  };

  return (
    <Container>
      <Flex p={5} align="flex-start" justify="space-between">
        <Box w="35%">
          <Image src={detail?.imageURL} alt={detail?.name} />
        </Box>

        <Box w="30%">
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            {detail?.name}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            {detail?.price.basicPrice}원
          </Text>
          <Text fontSize="sm" mb={4}>
            카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
          </Text>
        </Box>

        <Box w="30%">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" align="center" justify="center">
              <Box w="full" borderWidth="1px" borderRadius="lg" overflow="hidden" p={3} mb={10}>
                <Text fontWeight="bold" mb={2}>
                  {detail?.name}
                </Text>
                <Flex align="center" justify="center" mb={10}>
                  <IconButton aria-label="-" icon={<MinusIcon />} onClick={handleDecrease} />
                  <Input
                    width="100px"
                    textAlign="center"
                    value={quantity}
                    readOnly
                    mx={2}
                    {...register('quantity', {
                      min: {
                        value: 1,
                        message: '수량은 최소 1개 이상이어야 합니다.',
                      },
                      max: {
                        value: orderLimit,
                        message: `최대 주문 가능 수량은 ${orderLimit}개 입니다.`,
                      },
                      valueAsNumber: true,
                    })}
                  />
                  <IconButton aria-label="+" icon={<AddIcon />} onClick={handleIncrease} />
                </Flex>
                {errors.quantity && <Text color="red">{errors.quantity.message}</Text>}
              </Box>

              <Flex w="full" p={4} bg="gray.100" borderRadius="md" justify="space-between" mb={4}>
                <Text>총 결제 금액</Text>
                <Text fontWeight="bold">{totalPrice.toLocaleString()}원</Text>
              </Flex>

              <Flex w="full">
                <Button bg="black" color="white" w="full" type="submit">
                  나에게 선물하기
                </Button>
              </Flex>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Container>
  );
};

export default ProductPage;
