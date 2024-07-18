import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Section1, Section2 } from '@/components/features/products';

const ProductsPage = () => {
  const param = useParams();
  console.log(param.productId);
  return (
    <Container maxWidth="1280px">
      <Flex w="100%" h="100vh">
        <Section1 />
        <Section2 />
      </Flex>
    </Container>
  );
};

export default ProductsPage;
