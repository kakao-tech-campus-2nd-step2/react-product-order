import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/provider/Auth';
import type { GoodsData } from '@/types';

import ProductDetails from './ProductDetails';
import ProductImage from './ProductImage';
import QuantityControl from './QuantityControl';

type Props = {
  productDetail: GoodsData;
  productId: string;
};

export const ProductDetailForm = ({ productDetail, productId }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(productDetail.price.sellingPrice);
  const navigate = useNavigate();
  const authInfo = useAuth();

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = newQuantity > 100 ? 100 : newQuantity;
    setQuantity(validQuantity);
    setTotalPrice(validQuantity * productDetail.price.sellingPrice);
  };

  const handleOrder = () => {
    if (!authInfo) {
      const confirmLogin = window.confirm(
        '로그인이 필요한 메뉴입니다. 로그인 페이지로 이동하시겠습니까?',
      );
      if (confirmLogin) {
        navigate('/login');
      }
    } else {
      navigate(`/order/${productId}`, { state: { quantity } });
    }
  };

  return (
    <Wrapper>
      <ProductImage src={productDetail.imageURL} alt={productDetail.name} />
      <DetailsWrapper>
        <ProductDetails
          name={productDetail.name}
          price={productDetail.price.sellingPrice}
          description="카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!"
          id={productDetail.id}
        />
        <QuantityControlWrapper>
          <QuantityControl
            productName={productDetail.name}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
          />
        </QuantityControlWrapper>
        <OrderWrapper>
          <TotalPrice>총 결제 금액: {totalPrice.toLocaleString()}원</TotalPrice>
          <OrderButton onClick={handleOrder}>나에게 선물하기</OrderButton>
        </OrderWrapper>
      </DetailsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-left: 300px;
  margin-top: 50px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 20px;
  flex: 1;
  height: 100%;
`;

const QuantityControlWrapper = styled.div`
  align-self: center;
  height: 100%;
`;

const OrderWrapper = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TotalPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 350px;
  margin-bottom: 20px;
`;

const OrderButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 15px 30px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
`;

export default ProductDetailForm;
