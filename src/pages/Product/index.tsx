import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import ProductDetail from '../../components/features/Layout/ProductDetail';

const Product: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    return <Box>Product key is missing</Box>;
  }

  return (
    <Wrapper>
      <ProductDetail productId={productId} />
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  width: 100%;
  margin: 50px 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Product;
