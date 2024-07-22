import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouterPath } from '@/routes';
import { StyledAside } from '@/styles';

type Props = {
  name: string;
  price: number;
};

export const Aside = ({ name, price }: Props) => {
  const navigate = useNavigate();

  const authToken = sessionStorage.getItem('authToken');

  const [quantity, setQuantity] = useState<number>(1);
  const [totalAmount, setTotalAmount] = useState<number>(price);

  const handleQuantityChange = (input: React.ChangeEvent<HTMLInputElement> | number) => {
    let newQuantity: number;

    if (typeof input === 'number') {
      newQuantity = input;
    } else {
      newQuantity = parseInt(input.target.value, 10);
    }

    setQuantity(newQuantity);
    setTotalAmount(newQuantity * price);
  };

  const handleDecrementQuantity = () => {
    if (quantity >= 2) handleQuantityChange(quantity - 1);
  };

  const handleIncrementQuantity = () => handleQuantityChange(quantity + 1);

  const handlePaymentClick = () => {
    if (!authToken) {
      const userConfirm = confirm(
        '로그인이 필요한 메뉴입니다. \n로그인 페이지로 이동하시겠습니까?',
      );

      if (userConfirm) {
        const currentPath = window.location.pathname + window.location.search;
        navigate(`${RouterPath.login}?redirect=${encodeURIComponent(currentPath)}`);
      }
    } else navigate(RouterPath.order);
  };

  return (
    <StyledAside>
      <Container>
        <QuantityContainer>
          <Title>{name}</Title>
          <QuantityInput>
            <QuantityButton onClick={handleDecrementQuantity}>-</QuantityButton>
            <Input type="number" value={quantity} onChange={handleQuantityChange} />
            <QuantityButton onClick={handleIncrementQuantity}>+</QuantityButton>
          </QuantityInput>
        </QuantityContainer>
        <PaymentContainer>
          <TotalAmount>
            총 결제 금액
            <span style={{ fontSize: '20px', letterSpacing: '-0.02em' }}>{totalAmount}원</span>
          </TotalAmount>
          <PaymentButton onClick={handlePaymentClick}>나에게 선물하기</PaymentButton>
        </PaymentContainer>
      </Container>
    </StyledAside>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 30px 12px 30px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const QuantityContainer = styled.div`
  width: 100%;
  padding: 12px 14px 16px;
  border: 1px solid rgb(237, 237, 237);
  border-radius: 2px;
`;

const Title = styled.p`
  font-weight: 700;
  line-height: 22px;
  color: rgb(17, 17, 17);
  overflow-wrap: break-word;
  word-break: break-all;
`;

const QuantityInput = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8px;
  gap: 8px;
`;

const QuantityButton = styled.button`
  display: inline-flex;
  appearance: none;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  line-height: 1.2;
  padding: 0px;
`;

const Input = styled.input`
  width: 100%;
  min-width: 10px;
`;

const PaymentContainer = styled.div`
  padding: 12px 0px 0px;
`;

const TotalAmount = styled.div`
  margin-bottom: 20px;
  padding: 18px 20px;
  border-radius: 4px;
  background-color: rgb(245, 245, 245);
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: rgb(17, 17, 17);
`;

const PaymentButton = styled.button`
  width: 100%;
  border-radius: 4px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 200ms ease 0s;
  height: 60px;
  font-size: 16px;
  color: #fff;
  background-color: rgb(17, 17, 17);
`;
