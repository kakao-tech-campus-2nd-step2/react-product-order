import { Button, Flex, Input, Text, useNumberInput } from '@chakra-ui/react';
import { useEffect } from 'react';

type ItemCountProps = {
  name: string | undefined;
  setTotalCount?: (value: number) => void;
};

export default function ItemCount({ name, setTotalCount }: ItemCountProps) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 100,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    if (setTotalCount) setTotalCount(input.value);
  }, [input.value, setTotalCount]);

  return (
    <Flex
      w="100%"
      flexDirection="column"
      alignItems="center"
      border="1px solid rgb(237, 237, 237)"
      p="12px 14px 16px"
      gap="8px"
    >
      <Text fontWeight="700">{name}</Text>
      <Flex gap={'8px'} w="100%">
        <Button {...dec}>-</Button>
        <Input {...input} />
        <Button {...inc}>+</Button>
      </Flex>
    </Flex>
  );
}
