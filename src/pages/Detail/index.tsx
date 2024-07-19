import { Box, Button, Image, Input, Select, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchProductDetails, fetchProductOptions } from '@/api/instance';
import { Spinner } from '@/components/common/Spinner';
import { useAuth } from '@/provider/Auth';
import { Option, ProductDetailData } from '@/types';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const anthInfo = useAuth();
  const [quantity, setQuantity] = useState<number>(1);

  const {
    data: product,
    error: productError,
    isLoading: isProductLoading,
  } = useQuery<ProductDetailData, Error>({
    queryKey: ['product', productId ?? ''],
    queryFn: () => fetchProductDetails(productId ?? ''),
    enabled: !!productId,
  });

  const {
    data: optionsData,
    error: optionsError,
    isLoading: isOptionsLoading,
  } = useQuery<Option[], Error>({
    queryKey: ['options', productId ?? ''],
    queryFn: () => fetchProductOptions(productId ?? ''),
    enabled: !!productId,
  });

  useEffect(() => {
    if (productError || optionsError) {
      navigate('/'); //상품 정보 또는 옵션 정보 로드 중 오류발생하면 메인페이지로 이동
    }
  }, [productError, optionsError, navigate]);

  const handleGiftClick = () => {
    if (!anthInfo?.token) {
      if (window.confirm('로그인이 필요한 메뉴입니다. 로그인 페이지로 이동하시겠습니까?')) {
        navigate('/login'); //로그인 아니면 로그인페이지로 이동
      }
    } else if (product) {
      navigate('/payment', {
        //로그인 되어있으면 결제로 이동
        state: {
          product,
          quantity,
          totalPrice: product.detail.price.sellingPrice * quantity,
        },
      });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (isProductLoading || isOptionsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner />
      </Box>
    );
  }

  const options = Array.isArray(optionsData) ? optionsData : [];
  const totalPrice = product?.detail.price.sellingPrice
    ? product.detail.price.sellingPrice * quantity
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
            </Text>
            <Select placeholder="옵션 선택" marginBottom={4}>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
            <Input
              type="number"
              value={quantity}
              min={1}
              marginBottom={4}
              onChange={handleQuantityChange}
            />
            <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
              총 결제 금액: {totalPrice.toLocaleString()} 원
            </Text>
            <Button colorScheme="blue" onClick={handleGiftClick}>
              나에게 선물하기
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductDetail;
