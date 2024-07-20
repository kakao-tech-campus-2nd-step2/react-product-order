import { Box, Text, Textarea } from '@chakra-ui/react';

import type { giftMessageProps } from '@/types';

export default function GiftMessage({ message, setMessage }: giftMessageProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p="44px auto 24px"
      width="841px"
      height="253px"
    >
      <Text fontSize="18px" fontWeight={700} mb={4}>
        나에게 주는 선물
      </Text>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        p="12px 30px 16px"
        bgColor="rgb(226, 232, 240)"
        width="780px"
        height="100px"
        placeholder="선물과 함께 보낼 메시지를 적어보세요."
        mb={6}
      />
      <Box bgColor="rgb(237, 237, 237)" height="8px" width="899px"></Box>
    </Box>
  );
}
