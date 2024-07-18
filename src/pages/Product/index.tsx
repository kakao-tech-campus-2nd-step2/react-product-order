// import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import { useGetProductDetails } from '@/api/hooks/Product/useGetProductsDetail.ts';
import { useGetProductOptions } from '@/api/hooks/Product/useGetProductsOptions.ts';
import { Container } from '@/components/common/layouts/Container';
import ProductBuySection from '@/components/features/Product/ProductBuySection';
import ProductInfoSection from '@/components/features/Product/ProductInfoSection';
import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

const ProductPage = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const {
    data: productDetails,
    isLoading: isLoadingDetails,
    isError: isErrorDetails,
  } = useGetProductDetails({ productId });
  const {
    data: productOptions,
    isLoading: isLoadingOptions,
    isError: isErrorOptions,
  } = useGetProductOptions({ productId });
  // const queryClient = useQueryClient();

  const {
    name: title = '',
    brandInfo: { name: subtitle = '' } = {},
    price: { sellingPrice: amount = 0 } = {},
    imageURL: imageSrc = '',
  } = productDetails?.detail || {};

  const giftOrderLimit = productOptions?.options.giftOrderLimit || 0;

  if (isLoadingDetails || isErrorDetails) return null;
  if (!productDetails) return null;

  if (isLoadingOptions || isErrorOptions) return null;
  if (!productOptions) return null;

  return (
    <ProductPageLayout>
      <Container maxWidth='1280px'>
        <Box
          width='100%'
          display='flex'
          justifyContent='flex-start'
          alignItems='flex-start'
          position='relative'
        >
          <ProductInfoSection
            imageSrc={imageSrc}
            title={title}
            amount={amount}
          />
          <ProductBuySection
            title={title}
            imageSrc={imageSrc}
            amount={amount}
            subtitle={subtitle}
            limit={giftOrderLimit}
          />
        </Box>
      </Container>
    </ProductPageLayout>
  );
};

export default ProductPage;

const ProductPageLayout = styled.div`
  width: 100%;
`;
