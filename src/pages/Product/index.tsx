import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import ProductDetail from '../../components/features/Layout/ProductDetail';

const Product: React.FC = () => {
  const { productKey } = useParams<{ productKey: string }>(); // URL에서 productKey를 가져옴

  if (!productKey) {
    return <Box>Product key is missing</Box>;
  }

  return (
    <Box>
      <ProductDetail productKey={productKey} />
    </Box>
  );
};

export default Product;
