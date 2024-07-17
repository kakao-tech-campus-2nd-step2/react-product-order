import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Input, Text, useNumberInput } from '@chakra-ui/react';

export interface IOptionItem {
  name: string;
  minValues?: number;
  maxValues?: number;
  value: number;
  onChange: (price: number, value: string) => void;
}

export const ReceiptItem = ({
  name,
  minValues = 1,
  maxValues = 100,
  value,
  onChange,
}: IOptionItem) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    min: minValues,
    max: maxValues,
    defaultValue: 1,
    onChange: (cntStr) => {
      onChange(value, cntStr);
    },
  });

  const increment = getIncrementButtonProps();
  const decrement = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Box width="100%" p="12px 14px 16px" border="1px solid #ededed" borderRadius="2px">
      <Text
        fontWeight="700"
        lineHeight="22px"
        color="#111"
        overflowWrap="break-word"
        wordBreak="break-all"
      >
        {name}
      </Text>
      <HStack justifyContent="center" pt="8px" spacing="8px">
        <IconButton {...decrement} aria-label="수량 1개 감소" icon={<MinusIcon />} />
        <Input {...input} />
        <IconButton {...increment} aria-label="수량 1개 추가" icon={<AddIcon />} />
      </HStack>
    </Box>
  );
};
