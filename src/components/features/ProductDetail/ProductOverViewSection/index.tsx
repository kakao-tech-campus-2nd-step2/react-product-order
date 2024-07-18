import { Box, Divider, HStack, Image, Text, VStack } from '@chakra-ui/react';

import type { GoodsData } from '@/types';

interface Props {
  product: GoodsData;
}

export const ProductOverviewSection = ({ product }: Props) => {
  const { name, price, imageURL } = product;

  if (!product) {
    return null;
  }

  return (
    <Box p={8}>
      <HStack spacing={8} alignItems="start">
        <Image src={imageURL} alt={name} boxSize="400px" objectFit="cover" />
        <VStack align="start" spacing={4} w="full">
          <Text fontSize="2xl">{name}</Text>
          <Text fontSize="3xl">{price.sellingPrice}원</Text>
          <Divider borderColor="gray.300" mt={16} />
          <Text fontSize="sm" as="b">
            카톡 친구가 아니어도 선물 코드로 선물할 수 있어요!
          </Text>
          <Divider borderColor="gray.300" />
        </VStack>
      </HStack>
    </Box>
  );
};
