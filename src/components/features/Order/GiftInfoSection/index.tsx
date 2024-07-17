import { Box, Flex, Image, Text } from '@chakra-ui/react';

import type { GoodsData } from '@/types';

type GiftInfoProps = {
  data: GoodsData;
  quantity: number;
};

export const GiftInfoSection = ({ data, quantity }: GiftInfoProps) => {
  return (
    <Box
      as='section'
      w='100%'
      padding='16px'
    >
      <Text
        fontSize='15px'
        lineHeight='24px'
        fontWeight={700}
        color='rgb(0, 0, 0)'
      >
        선물내역
      </Text>
      <Box w='100%' h='16px' />
      <Box
        w='100%'
        padding='20px 16px 16px'
        borderRadius='8px'
        border='1px solid rgb(237, 237, 237)'
        boxShadow='rgba(0, 0, 0, 0.02) 0px 4px 8px'
      >
        <Flex>
          <Box
            border='1px solid rgba(0, 0, 0, 0.05)'
            borderRadius='4px'
            overflow='hidden'
          >
            <Image
              src={data.imageURL}
              w={86}
              objectFit='cover'
              objectPosition='center center'
              aspectRatio={1 / 1}
            />
          </Box>
          <Box paddingLeft='8px' >
            <Text
              fontSize='13px'
              lineHeight='14px'
              color='rgb(136, 136, 136)'
              fontWeight={400}
            >
              {data.brandInfo.name}
            </Text>
            <Text
              fontSize='14px'
              lineHeight='18px'
              mt='3px'
              color='rgb(34, 34, 34)'
              overflow='hidden'
              fontWeight={400}
            >
              {data.name} X {quantity}개
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};