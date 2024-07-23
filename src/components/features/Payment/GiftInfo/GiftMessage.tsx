import { Box, Text, Textarea } from '@chakra-ui/react';
import { Form } from 'react-hook-form';

import type { formProps } from '@/types';

export default function GiftMessage({ methods }: formProps) {
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
      <Form>
        <Textarea
          {...methods.register('message', {
            required: '메시지를 입력해 주세요.',
            maxLength: { value: 100, message: '100자 이내로 입력해 주세요.' },
          })}
          p="12px 30px 16px"
          bgColor="rgb(226, 232, 240)"
          width="780px"
          height="100px"
          placeholder="선물과 함께 보낼 메시지를 적어보세요."
          mb={6}
        />
      </Form>
      <Box bgColor="rgb(237, 237, 237)" height="8px" width="899px"></Box>
    </Box>
  );
}
