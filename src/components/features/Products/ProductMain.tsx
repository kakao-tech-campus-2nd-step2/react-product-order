import { Box, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";

export const MainContent = (src: string, title: string, price: number) => {
  return (
    <Box width="100%" maxWidth="900px">
      <Box width="100%" padding={{ base: "16px 16px 60px", md: "32px 32px 80px" }}>
        <Flex width="100%" direction={{ base: "column", md: "row" }}>
          <Image src={src} width="100%" maxWidth="450px" />
          <Box width="100%" paddingLeft={{ base: "0", md: "24px" }}>
            <Heading
              as="h2"
              paddingTop="24px"
              fontSize="24px"
              lineHeight="33px"
              color="rgb(17, 17, 17)"
              fontWeight="400"
              wordBreak="break-all"
            >
              {title}
            </Heading>
            <Text
              width="100%"
              minHeight="120px"
              paddingTop="16px"
              fontSize="30px"
              fontWeight="400"
              lineHeight="52px"
              color="rgb(34, 34, 34)"
            >
              {price}원
            </Text>
            <Divider
              orientation="horizontal"
              opacity="0.6"
              borderWidth="0 0 1px"
              borderColor="inherit"
              width="100%"
              color="rgb(245, 245, 245)"
            />
            <Text padding="24px 12px" fontSize="14px" fontWeight="700" color="rgb(17, 17, 17)">
              카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
            </Text>
            <Divider
              orientation="horizontal"
              opacity="0.6"
              borderWidth="0 0 1px"
              borderColor="inherit"
              width="100%"
              color="rgb(245, 245, 245)"
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
