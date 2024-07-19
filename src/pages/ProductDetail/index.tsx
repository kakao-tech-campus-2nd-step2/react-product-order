import { Stack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import ProductCountSection from '@/components/features/Detail/ProductCountSection';
import ProductDetailSection from '@/components/features/Detail/ProductDetailSection';

const ProductDetialPage = () => {
  const navigate = useNavigate();

  const { productId } = useParams();

  if (!productId) {
    navigate('/');
    return null;
  }

  return (
    <Container>
      <Stack direction="row">
        <ProductDetailSection productId={productId} />
        <ProductCountSection productId={productId} />
      </Stack>
    </Container>
  );
};

export default ProductDetialPage;
