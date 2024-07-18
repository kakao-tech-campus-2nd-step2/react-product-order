import { Box, Flex, forwardRef, Text, Textarea } from '@chakra-ui/react';

export const MessageSection = forwardRef((_, ref) => (
  <Box as="section" w="100%" padding="44px 0px 32px">
    <Flex w="100%" justifyContent="center">
      <Text
        fontSize="18px"
        lineHeight="21px"
        color="rgb(34, 34, 34)"
        fontWeight={700}
        boxSizing="border-box"
      >
        나에게 주는 선물
      </Text>
    </Flex>
    <Box w="100%" padding="14px 30px">
      <Box w="100%" padding="12px 30px 16px">
        <Textarea
          ref={ref}
          name="messageCardTextMessage"
          placeholder="선물과 함께 보낼 메시지를 적어보세요"
          w="100%"
          h="100px"
          fontSize="1rem"
          borderRadius="0.375rem"
          outlineOffset="2px"
          background="#EDF2F7"
        />
      </Box>
    </Box>
  </Box>
));
