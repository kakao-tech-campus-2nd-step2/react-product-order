import { Box, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react';

interface ProductDetailSectionProps {
  id: number;
  name: string;
  imageURL: string;
  price: {
    sellingPrice: number;
  };
}

export const ProductDetailSection = (data: ProductDetailSectionProps) => {
  return (
    <Box as="main" maxW="900px">
      <Box as="article" w="100%" padding="32px 32px 80px">
        <Flex w="100%">
          <Image src={data.imageURL} alt={data.name} maxW="450px" />
          <Box w="100%" paddingLeft="24px">
            <Heading
              as="h2"
              paddingTop="24px"
              fontSize="24px"
              fontWeight={400}
              lineHeight="33px"
              color="rgb(17, 17, 17)"
              wordBreak="break-all"
            >
              {data.name}
            </Heading>
            <Text
              w="100%"
              minH="120px"
              paddingTop="16px"
              fontSize="30px"
              lineHeight="52px"
              color="rgb(34, 34, 34)"
            >
              {data.price.sellingPrice}원
            </Text>
            <Divider opacity={0.6} borderWidth="0px 0px 1px" w="100%" color="rgb(245, 245, 245)" />
            <Text padding="24px 12px" fontSize="14px" fontWeight={700} color="rgb(17, 17, 17)">
              카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
            </Text>
            <Divider opacity={0.6} borderWidth="0px 0px 1px" w="100%" color="rgb(245, 245, 245)" />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
