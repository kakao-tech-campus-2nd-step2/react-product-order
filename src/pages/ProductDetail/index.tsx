import { Box, Button, Image, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { getDynamicPath } from '@/routes/path';

import useGetProductDetails from '../../api/hooks/useGetProductDetails';
import useGetProductOptions from '../../api/hooks/useGetProductOptions';
import { useGift } from '../../provider/Auth';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId?: string }>();
  const { quantity, setQuantity, setSelectedProduct } = useGift();

  console.log('Product ID from params:', productId);

  if (!productId) {
    return <div>Invalid product ID</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: productDetails, isLoading: detailsLoading, isError: detailsError } = useGetProductDetails(productId);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading: optionsLoading, isError: optionsError } = useGetProductOptions(productId);

  console.log('Product details:', productDetails);

  if (detailsLoading || optionsLoading) return <div>Loading...</div>;
  if (detailsError || optionsError) return <div>Error loading product details or options</div>;

  if (!productDetails || !productDetails.price) {
    return <div>상품 정보를 불러오는 중 문제가 발생했습니다.</div>;
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleGift = () => {
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
            <Input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
          </Box>
          <Text>총 가격: {totalPrice}원</Text>
          <Link to={getDynamicPath.checkout(productId)}>
            <Button onClick={handleGift}>나에게 선물하기</Button>
          </Link>
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
