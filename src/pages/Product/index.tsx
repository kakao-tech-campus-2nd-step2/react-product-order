import React from 'react';
import styled from '@emotion/styled';
import Layout from '@components/features/Layout';
import { CenteredContainer } from '@components/common';
import ProductInfo from '@components/features/Product/ProductInfo';
import ProductOrder from '@components/features/Product/ProductOrder';
import { ROUTE_PATH } from '@routes/path';
import useRedirectIfNoParam from '@hooks/useRedirectIfNoParam';

export default function Product() {
  useRedirectIfNoParam('productId', ROUTE_PATH.HOME);

  return (
    <Layout>
      <CenteredContainer maxWidth="lg">
        <InnerContainer>
          <ProductInfo />
          <ProductOrder />
        </InnerContainer>
      </CenteredContainer>
    </Layout>
  );
}

const InnerContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: space-between;
  padding-top: 100px;
`;
