import { Box, Flex, Text, Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export const MessageSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
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
            {...register('cardMessage', {
              required: '메시지를 입력해주세요.',
              maxLength: { value: 100, message: '메시지는 100자 이내로 입력해주세요.' },
            })}
            placeholder="선물과 함께 보낼 메시지를 적어보세요"
            w="100%"
            h="100px"
            fontSize="1rem"
            borderRadius="0.375rem"
            outlineOffset="2px"
            background="#EDF2F7"
          />
          {errors.cardMessage && (
            <Text color="red" fontSize="14px" mt="2px">
              {errors.cardMessage.message as string}
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};
