import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import ProductDetail from '../../components/features/Layout/ProductDetail';

const Product: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    return <Box>Product key is missing</Box>;
  }

  return (
    <Box>
      <ProductDetail productId={productId} />
    </Box>
  );
};

export default Product;
