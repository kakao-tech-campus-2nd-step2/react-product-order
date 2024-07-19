import { Box, Button, Image, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

import { getDynamicPath } from '@/routes/path';

import useGetProductDetails from '../../api/hooks/useGetProductDetails';
import useGetProductOptions from '../../api/hooks/useGetProductOptions';
import { useAuth,useGift } from '../../provider/Auth';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId?: string }>();
  const navigate = useNavigate();
  const { quantity, setQuantity, setSelectedProduct } = useGift();
  const authInfo = useAuth();
  const [error, setError] = useState('');

  if (!productId) {
    navigate('/'); // Redirect to the main page if productId is invalid
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: productDetails, isLoading: detailsLoading, isError: detailsError } = useGetProductDetails(productId);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: productOptions, isLoading: optionsLoading, isError: optionsError } = useGetProductOptions(productId);

  if (detailsLoading || optionsLoading) return <div>Loading...</div>;
  if (detailsError || optionsError || !productDetails || !productDetails.price) {
    navigate('/'); // Redirect to the main page if there's an error or no product details
    return null;
  }

  const giftOrderLimit = productOptions?.[0]?.giftOrderLimit ?? Infinity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > giftOrderLimit) {
      setError(`최대 주문 수량은 ${giftOrderLimit}개 입니다.`);
      return;
    }
    setError('');
    setQuantity(newQuantity);
  };

  const handleGift = () => {
    if (!authInfo) {
      navigate(getDynamicPath.login()); // Redirect to login page if not authenticated
      return;
    }

    if (productDetails) {
      setSelectedProduct(productDetails);
    }
  };

  const totalPrice = productDetails.price ? productDetails.price.sellingPrice * quantity : 0;

  return (
    <Box>
      {productDetails && (
        <>
          <Image src={productDetails.imageURL} alt={productDetails.name} />
          <Text fontWeight="bold" as="h1" lineHeight="tight">{productDetails.name}</Text>
          {productDetails.price && (
            <Text>가격: {productDetails.price.sellingPrice}원</Text>
          )}
          <Box>
            <label>수량: </label>
            <Input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={giftOrderLimit}
            />
            {error && <Text color="red">{error}</Text>}
          </Box>
          <Text>총 가격: {totalPrice}원</Text>
          <Button onClick={handleGift}>나에게 선물하기</Button>
          <Box mt="4">
            <Text fontWeight="bold" as="h2">상품 설명</Text>
            {productDetails.productDescription?.images.map((image, index) => (
              <Image key={index} src={image} alt={`Product description image ${index + 1}`} />
            ))}
          </Box>
          <Box mt="4">
            <Text fontWeight="bold" as="h2">리뷰</Text>
            <Text>평균 평점: {productDetails.review?.averageRating}</Text>
            <Text>리뷰 수: {productDetails.review?.totalReviewCount}</Text>
          </Box>
          <Box mt="4">
            <Text fontWeight="bold" as="h2">상품 상세 정보</Text>
            {productDetails.productDetailInfo?.announcements.map((announcement, index) => (
              <Box key={index}>
                <Text>{announcement.name}: {announcement.value}</Text>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductDetailPage;
