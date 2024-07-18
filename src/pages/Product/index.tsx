import { useParams } from 'react-router-dom';

import { useGetProductDetails } from '@/api/hooks/useGetProductsDetail';
import { Container } from '@/components/common/layouts/Container';
import ProductBuySection from '@/components/features/Product/ProductBuySection';
import ProductInfoSection from '@/components/features/Product/ProductInfoSection';
import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

const ProductPage = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const { data, isLoading, isError } = useGetProductDetails({ productId });
  const {
    name: title = '',
    brandInfo: { name: subtitle = '' } = {},
    price: { sellingPrice: amount = 0 } = {},
    imageURL: imageSrc = '',
  } = data?.detail || {};

  if (isLoading || isError) return null;
  if (!data) return null;
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
