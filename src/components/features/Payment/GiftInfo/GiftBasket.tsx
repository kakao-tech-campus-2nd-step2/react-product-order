import { Box, Flex, Image, Text } from '@chakra-ui/react';

import type { productInfoProps } from '@/types';

export default function GiftBasket({ productInfo }: productInfoProps) {
  return (
    <Box width="841px" height="198px" p="16px">
      <Text fontSize="15px" fontWeight={700} mb={3}>
        선물내역
      </Text>
      <Flex p={4} borderWidth="1px" borderRadius="md" width="809px" height="126px">
        <Image width="80px" height="80px" src={productInfo?.imageURL} alt="상품 이미지" mr={4} />
        <Box pl="8px">
          <Text fontSize="13px" color="rgb(136, 136, 136)">
            {productInfo?.brandName}
          </Text>
          <Text fontSize="14px" mt="3px">
            {productInfo?.name}X{productInfo?.amount}개
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
