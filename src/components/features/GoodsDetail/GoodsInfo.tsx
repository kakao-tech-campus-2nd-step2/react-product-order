import { Box, Text } from '@chakra-ui/react';

import { Image } from '@/components/common/Image';

export default function GoodsInfo() {
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
          <Image
            width="450px"
            ratio="square"
            src="https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png"
          />
        </Box>
        <Box width={386} height={450} pl="24px">
          <Text fontSize="24px" fontWeight={400} pt="24px">
            외식 통합권 10만원권
          </Text>
          <Box
            pt="16px"
            fontSize="30px"
            height={120}
            borderBottomWidth="0.1px"
            borderBottomColor={'rgb(226, 232, 240)'}
          >
            100000 원
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
