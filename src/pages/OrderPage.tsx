import styled from '@emotion/styled';
import { useRef } from 'react';

import { Container } from '@/components/common/Layout/Container';
import { GiftMessageSection } from '@/components/Order/GiftMessageSection';
import { PaymentSection } from '@/components/Order/PaymentSection';
import { useOrderHistory } from '@/hooks/useOrderHistory';

export default function OrderPage() {
  const { orderHistoryToken } = useOrderHistory();

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <OrderPageWrapper>
      <Container maxWidth="1280px">
        <Inner>
          <Left>
            <GiftMessageSection orderHistory={orderHistoryToken} inputRef={inputRef} />
          </Left>
          <Right>
            <PaymentSection orderHistory={orderHistoryToken} inputRef={inputRef} />
          </Right>
        </Inner>
      </Container>
    </OrderPageWrapper>
  );
}
const OrderPageWrapper = styled.div`
  width: 100%;
`;
const Inner = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`;
const Left = styled.div`
  width: 100%;
  max-width: 900px;
  border: 1px solid #ededed;
  border-top: none;
  border-bottom: none;
  height: calc(100vh - 54px);
`;
const Right = styled.div`
  display: none;
  position: sticky;
  top: 54px;
  width: 100%;
  max-width: 360px;
  height: calc(100vh - 54px);
  border-right: 1px solid #ededed;

  @media screen and (min-width: 768px) {
    display: block;
  }
`;
