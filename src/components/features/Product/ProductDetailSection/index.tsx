import { Box, Divider, Flex, Image, Text } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

import { useCurrentProduct } from '@/api/hooks/useGetProduct';
import { RouterPath } from '@/routes/path';

type Props = {
  imageURL: string;
  name: string;
  price: number;
};

export const ProductDetailSection = ({ productKey }: { productKey: string }) => {
  const { isRender, currentProduct } = useCurrentProduct(productKey);
  if (!isRender) return null;

  if (!currentProduct) {
    return <Navigate to={RouterPath.notFound} />;
  }

  const product: Props = {
    imageURL: currentProduct.imageURL,
    name: currentProduct.name,
    price: currentProduct.price.sellingPrice,
  };

  return (
    <Flex>
      <Image boxSize="450px" src={product.imageURL} />
      <Box>
        <Box>{product.name}</Box>
        <Box>{product.price}</Box>
        <Box>
          <Divider />
          <Text as="b">카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
          <Divider />
        </Box>
      </Box>
    </Flex>
  );
};
