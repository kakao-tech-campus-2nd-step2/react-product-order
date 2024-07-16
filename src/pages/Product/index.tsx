import { Container } from '@/components/common/layouts/Container';
import ProductBuySection from '@/components/features/Product/ProductBuySection';
import ProductInfoSection from '@/components/features/Product/ProductInfoSection';
import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

const ProductPage = () => {
  const title =
    "농협안심한우 1등급 '스페셜 구이세트' 900g (등심+채끝+안심, 각 300g)";
  const price = 128000;
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
          <ProductInfoSection Title={title} Price={price} />
          <ProductBuySection Title={title} Price={price} />
        </Box>
      </Container>
    </ProductPageLayout>
  );
};

export default ProductPage;

const ProductPageLayout = styled.div`
  width: 100%;
`;
