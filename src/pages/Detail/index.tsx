import { Box, Button, Image, Input, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { fetchProductDetails } from '@/api/instance';
import { Spinner } from '@/components/common/Spinner';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { ProductDetailData } from '@/types';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const anthInfo = useAuth();
  const giftOrderLimit = 100;

  const {
    data: product,
    error: productError,
    isLoading: isProductLoading,
  } = useQuery<ProductDetailData, Error>({
    queryKey: ['product', productId ?? ''],
    queryFn: () => fetchProductDetails(productId ?? ''),
    enabled: !!productId,
  });

  useEffect(() => {
    if (productError) {
      navigate('/');
    }
  }, [productError, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ quantity: number }>({ defaultValues: { quantity: 1 } });

  const onSubmit = (data: { quantity: number }) => {
    if (!anthInfo) {
      if (window.confirm('로그인이 필요한 메뉴입니다. 로그인 페이지로 이동하시겠습니까?')) {
        navigate(`${RouterPath.login}?redirect=${encodeURIComponent(location.pathname)}`);
      }
    } else if (product) {
      navigate(RouterPath.payment, {
        state: {
          product,
          quantity: data.quantity,
          totalPrice: product.detail.price.sellingPrice * data.quantity,
        },
      });
    }
  };

  const handleQuantityChange = (value: number) => {
    if (value > 0 && value <= giftOrderLimit) {
      setValue('quantity', value);
    } else if (value > giftOrderLimit) {
      alert(`최대 주문 가능 수량은 ${giftOrderLimit}개입니다.`);
      setValue('quantity', giftOrderLimit);
    }
  };

  if (isProductLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner />
      </Box>
    );
  }

  const totalPrice = product?.detail.price.sellingPrice
    ? product.detail.price.sellingPrice * (errors.quantity ? 1 : 0)
    : 0;

  return (
    <Box display="flex" justifyContent="space-between" padding="20px">
      {product && (
        <>
          <Box>
            <Image src={product.detail.imageURL} alt={product.detail.name} boxSize="300px" />
          </Box>
          <Box marginLeft="20px" maxWidth="400px">
            <Text fontSize="2xl" marginBottom={4}>
              {product.detail.name}
            </Text>
            <Text fontSize="xl" color="gray.600" marginBottom={4}>
              {product.detail.price.sellingPrice?.toLocaleString() ?? 0} 원
              <Text>카톡 친구가 아니어도 선물 코드로 선물할 수 있어요!</Text>
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <QuantityWrapper>
                <Button onClick={() => handleQuantityChange(errors.quantity ? 1 : 0 - 1)}>-</Button>
                <QuantityInput
                  type="number"
                  {...register('quantity', {
                    min: { value: 1, message: '최소 1개 이상 입력해주세요.' },
                    max: {
                      value: giftOrderLimit,
                      message: `최대 ${giftOrderLimit}개까지 가능합니다.`,
                    },
                  })}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
                  textAlign="center"
                  width="50px"
                />
                <Button onClick={() => handleQuantityChange(errors.quantity ? 1 : 0 + 1)}>+</Button>
              </QuantityWrapper>
              {errors.quantity && <Text color="red.500">{errors.quantity.message}</Text>}
              <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
                총 결제 금액: {totalPrice.toLocaleString()} 원
              </Text>
              <Button colorScheme="blue" type="submit">
                나에게 선물하기
              </Button>
            </form>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductDetail;

const QuantityWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

const QuantityInput = styled(Input)`
  text-align: center;
  width: 150px;
  margin: 0 10px;
`;
