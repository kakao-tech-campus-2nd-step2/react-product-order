import React from 'react';
import styled from '@emotion/styled';
import Layout from '@components/features/Layout';
import { CenteredContainer } from '@components/common';
import OrderMessage from '@components/features/Order/OrderMessage';
import Payment from '@components/features/Order/Payment';
import useOrderData from './hooks/useOrderData';

export default function Order() {
  const { orderData, handleOrderDataChange } = useOrderData();

  return (
    <Layout>
      <CenteredContainer maxWidth="lg">
        <InnerContainer>
          <OrderMessage message={orderData.message} onMessageChange={handleOrderDataChange} />
          <Payment
            message={orderData.message}
            hasCashRecipt={orderData.hasCashRecipt}
            cashReciptType={orderData.cashReciptType}
            cashReciptNumber={orderData.cashReciptNumber}
            onInputChange={handleOrderDataChange}
          />
        </InnerContainer>
      </CenteredContainer>
    </Layout>
  );
}

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 80px;
  height: 100vh;
`;
