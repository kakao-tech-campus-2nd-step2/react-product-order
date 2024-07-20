import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import type { GoodsData } from '@/types';

type Props = {
  productDetail: GoodsData;
  quantity: number;
};

const GiftDetails: React.FC<Props> = ({ productDetail, quantity }) => (
  <Box>
    <Text fontSize="lg" mb={2}>선물내역</Text>
    <HStack spacing={4} align="center">
      <Image 
        boxSize="100px" 
        objectFit="cover" 
        src={productDetail.imageURL}
        alt={productDetail?.name}
      />
      <VStack align="start">
        <Text>{productDetail?.brandInfo.name}</Text>
        <Text>{productDetail?.name} X {quantity}개</Text>
      </VStack>
    </HStack>
  </Box>
);

export default GiftDetails;
