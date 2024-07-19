import { Box, Image, Text } from '@chakra-ui/react';

import type { ProductDetail, ProductOption } from '@/types';

interface Props {
  product: ProductDetail & { selectedOption: ProductOption | null; quantity: number };
}

export const GiftSummarySection = ({ product }: Props) => {
  return (
    <Box px={16}>
      <Text fontSize="lg" as="b">
        선물내역
      </Text>
      <Box
        display="flex"
        alignItems="center"
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        p={4}
        mt={4}
      >
        <Image
          src={product.imageURL}
          alt="product image"
          boxSize="100px"
          borderRadius="md"
          objectFit="cover"
        />
        <Box p={4}>
          <Text color="gray.500">{product.brandInfo.name}</Text>
          <Text>
            {product.name} (
            {product.selectedOption ? product.selectedOption.name : '선택된 옵션 없음'}) x{' '}
            {product.quantity}개
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
