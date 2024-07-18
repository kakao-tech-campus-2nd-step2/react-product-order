import { useLocation } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import ProductBuySection from '@/components/features/Product/ProductBuySection';
import ProductInfoSection from '@/components/features/Product/ProductInfoSection';
import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

const ProductPage = () => {
  const location = useLocation();
  const { imageSrc, title, amount } = location.state;
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
          <ProductBuySection title={title} amount={amount} />
        </Box>
      </Container>
    </ProductPageLayout>
  );
};

export default ProductPage;

const ProductPageLayout = styled.div`
  width: 100%;
`;
