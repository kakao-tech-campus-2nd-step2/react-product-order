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
  const { isLoading: optionsLoading, isError: optionsError } = useGetProductOptions(productId);

  if (detailsLoading || optionsLoading) return <div>Loading...</div>;
  if (detailsError || optionsError) return <div>Error loading product details or options</div>;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const totalPrice = productDetails ? productDetails.price.sellingPrice * quantity : 0;

  return (
    <div>
      {productDetails && (
        <>
          <h1>{productDetails.name}</h1>
          <p>가격: {productDetails.price.sellingPrice}원</p>
          <div>
            <label>수량: </label>
            <input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
          </div>
          <p>총 가격: {totalPrice}원</p>
          <Link to="/checkout" onClick={() => setSelectedProduct(productDetails)}>나에게 선물하기</Link>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
