import { Flex, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
export default function Section1() {
  return (
    <Flex w="100%" p="32px 32px 80px;">
      <Image boxSize="450px" objectFit="cover" src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
      <Flex flexDirection="column" marginLeft="24px">
        <Text pt="24px" fontSize="24px" lineHeight="33px" fontWeight="400">
          [단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)
        </Text>
        <Text pt="16px" minHeight="120px" fontSize="30px" lineHeight="52px" fontWeight="400">
          145000원
        </Text>
        <Text p="24px 12px" fontSize="14px" fontWeight="700">
          카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
        </Text>
      </Flex>
    </Flex>
  );
}
