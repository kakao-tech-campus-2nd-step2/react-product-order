import { Button, Flex, Input, Text, useNumberInput } from '@chakra-ui/react';

export default function ItemCount() {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 10,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Flex
      w="100%"
      flexDirection="column"
      alignItems="center"
      border="1px solid rgb(237, 237, 237)"
      p="12px 14px 16px"
      gap="8px"
    >
      <Text fontWeight="700">[특가] 치악산 복숭아 당도최고 </Text>
      <Flex gap={'8px'} w="100%">
        <Button {...dec}>-</Button>
        <Input flexGrow={1} {...input} />
        <Button {...inc}>+</Button>
      </Flex>
    </Flex>
  );
}
