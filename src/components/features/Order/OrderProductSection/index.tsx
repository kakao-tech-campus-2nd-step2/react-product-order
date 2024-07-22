import { Box, Container, Image, Text } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

import { useCurrentProduct } from '@/api/hooks/useGetProduct';
import { RouterPath } from '@/routes/path';

type Props = {
  imageSrc: string;
  subtitle: string;
  title: string;
  count: number;
};

export const OrderProductSection = ({
  productKey,
  count,
}: {
  productKey: string;
  count: number;
}) => {
  const { isRender, currentProduct } = useCurrentProduct(productKey);
  if (!isRender) return null;

  if (!currentProduct) {
    return <Navigate to={RouterPath.notFound} />;
  }

  const product: Props = {
    imageSrc: currentProduct.imageURL,
    subtitle: currentProduct.brandInfo.name,
    title: currentProduct.name,
    count: count,
  };

  return (
    <>
      <Container>
        <Text>선물내역</Text>
        <Box>
          <Image boxSize="66px" src={product.imageSrc} />
          <Box>
            <Text>{product.subtitle}</Text>
            <Text>
              {product.title} X {product.count}개
            </Text>
          </Box>
        </Box>
      </Container>
    </>
  );
};
