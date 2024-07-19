import React from 'react';
import styled from '@emotion/styled';
import Layout from '@components/features/Layout';
import { CenteredContainer } from '@components/common';
import ProductInfo from '@components/features/Product/ProductInfo';
import ProductOrder from '@components/features/Product/ProductOrder';
import { ROUTE_PATH } from '@routes/path';
import useRedirectIfNoParam from '@hooks/useRedirectIfNoParam';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProductsDetail, getProductsOptions } from '@apis/products';
import { ProductDetailResponse, ProductOptionResponse } from '@internalTypes/responseTypes';
import { AxiosError } from 'axios';

export default function Product() {
  const { productId } = useParams<{ productId: string }>();
  const { data: productDetailData } = useQuery<ProductDetailResponse, AxiosError>({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductsDetail({ productId }),
  });
  useRedirectIfNoParam('productId', ROUTE_PATH.HOME);

  const { data: productOptionData } = useQuery<ProductOptionResponse, AxiosError>({
    queryKey: ['productOption', productId],
    queryFn: () => getProductsOptions({ productId }),
  });

  return (
    <Layout>
      <CenteredContainer maxWidth="lg">
        <InnerContainer>
          <ProductInfo
            image={productDetailData?.detail.imageURL}
            name={productDetailData?.detail.name}
            price={productDetailData?.detail.price.basicPrice}
          />
          <ProductOrder
            name={productDetailData?.detail.name}
            giftOrderLimit={productOptionData?.options.giftOrderLimit}
          />
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
