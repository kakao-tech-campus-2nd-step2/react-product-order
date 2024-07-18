import { useNavigate, useParams } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
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
      <ProductDetailSection productId={productId} />
    </Container>
  );
};

export default ProductDetialPage;
