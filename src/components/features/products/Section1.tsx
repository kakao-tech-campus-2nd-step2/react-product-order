import { Flex, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { useContext } from 'react';

import { ProductContext } from '@/pages/Products/index';

export default function Section1() {
  const data = useContext(ProductContext);

  return (
    <Flex w="100%" p="32px 32px 80px;">
      <Image boxSize="450px" objectFit="cover" src={data?.data.detail.imageURL} />
      <Flex flexDirection="column" marginLeft="24px">
        <Text pt="24px" fontSize="24px" lineHeight="33px" fontWeight="400">
          {data?.data.detail.name}
        </Text>
        <Text pt="16px" minHeight="120px" fontSize="30px" lineHeight="52px" fontWeight="400">
          {data?.data.detail.price.basicPrice}원
        </Text>
        <Text p="24px 12px" fontSize="14px" fontWeight="700">
          카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
        </Text>
      </Flex>
    </Flex>
  );
}
