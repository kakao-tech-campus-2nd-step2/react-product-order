import { Box, Text } from '@chakra-ui/react';

import { Image } from '@/components/common/Image';
import type { goodsDetailData } from '@/types';

export default function GoodsInfo({ price, imageURL, name }: goodsDetailData) {
  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="900px"
        height="562px"
        p="32px 32px 80px"
      >
        <Box>
          <Image width="450px" ratio="square" src={imageURL} />
        </Box>
        <Box width={386} height={450} pl="24px">
          <Text fontSize="24px" fontWeight={400} pt="24px">
            {name}
          </Text>
          <Box
            pt="16px"
            fontSize="30px"
            height={120}
            borderBottomWidth="0.1px"
            borderBottomColor={'rgb(226, 232, 240)'}
          >
            {price}원
          </Box>
          <Box
            p="24px 12px"
            fontSize="14px"
            fontWeight={700}
            borderBottomWidth="0.1px"
            borderBottomColor={'rgb(226, 232, 240)'}
          >
            카톡 친구가 아니어도 선물 코드로 선물할 수 있어요!
          </Box>
        </Box>
      </Box>
    </div>
  );
}
