import { Box, Button,Image, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { Link,useParams } from 'react-router-dom';

import useGetProductDetails from '../../api/hooks/useGetProductDetails';
import useGetProductOptions from '../../api/hooks/useGetProductOptions';
import { useGift } from '../../provider/Auth';

const ProductDetail = () => {
  const { productId } = useParams<{ productId?: string }>();
  const { quantity, setQuantity, setSelectedProduct } = useGift();

  if (!productId) {
    return <div>Invalid product ID</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: productDetails, isLoading: detailsLoading, isError: detailsError } = useGetProductDetails(productId);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: productOptions, isLoading: optionsLoading, isError: optionsError } = useGetProductOptions(productId);

  if (detailsLoading || optionsLoading) return <div>Loading...</div>;
  if (detailsError || optionsError) return <div>Error loading product details or options</div>;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleGift = () => {
    if (productDetails) {
      setSelectedProduct(productDetails);
    }
  };

  const totalPrice = productDetails ? productDetails.price.sellingPrice * quantity : 0;

  return (
    <Box>
      {productDetails && (
        <>
          <Image src={productDetails.imageURL} alt={productDetails.name} />
          <Text fontWeight="bold" as="h1" lineHeight="tight">{productDetails.name}</Text>
          <Text>가격: {productDetails.price.sellingPrice}원</Text>
          <Box>
            <label>수량: </label>
            <Input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
          </Box>
          {productOptions && productOptions.length > 0 && (
            <Box mt="4">
              <Text>옵션 선택:</Text>
              <select>
                {productOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </Box>
          )}
          <Text>총 가격: {totalPrice}원</Text>
          <Link to="/checkout">
            <Button onClick={handleGift}>나에게 선물하기</Button>
          </Link>
        </>
      )}
    </Box>
  );
};

export default ProductDetail;
