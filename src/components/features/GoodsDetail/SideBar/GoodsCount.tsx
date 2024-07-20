import { Box, Button, Flex, NumberInput, NumberInputField, Text } from '@chakra-ui/react';

type CountData = {
  name?: string;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
};
export default function GoodsCount({ name, amount, setAmount, limit }: CountData) {
  const handleIncrease = () => {
    setAmount(Math.min(amount + 1, limit));
  };

  const handleDecrease = () => {
    setAmount(Math.max(amount - 1, 1));
  };

  const handleChange = (value: string) => {
    setAmount(Number(value));
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        p="12px 14px 16px"
        width="318px"
        borderWidth="0.1px"
        borderColor="rgb(237, 237, 237)"
      >
        <Box fontSize="16px" fontWeight={700}>
          {name}
        </Box>
        <Flex pt="8px" justifyContent="space-between" alignItems="center">
          <Button borderRadius="6px" padding="0" onClick={handleDecrease}>
            <Text display="flex" fontSize="16px" fontWeight={600} color="rgb(26, 32, 44)">
              -
            </Text>
          </Button>
          <NumberInput
            height="40px"
            width="192px"
            borderRadius="6px"
            defaultValue={1}
            min={1}
            max={limit}
            id="amount"
            name="amount"
            value={amount}
            onChange={(value) => handleChange(value)}
          >
            <NumberInputField padding="0px 12px"></NumberInputField>
          </NumberInput>
          <Button borderRadius="6px" padding="0" onClick={handleIncrease}>
            <Text display="flex" fontSize="16px" fontWeight={600} color="rgb(26, 32, 44)">
              +
            </Text>
          </Button>
        </Flex>
      </Box>
    </div>
  );
}
