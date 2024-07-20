import { Box, Text } from '@chakra-ui/react';

interface Props {
  totalPrice: number;
}

export const TotalPrice = ({ totalPrice }: Props) => {
  return (
    <Box
      bg="blackAlpha.50"
      p={4}
      my={4}
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="sm" as="b">
        총 결제 금액
      </Text>
      <Text fontSize="xl" as="b">
        {totalPrice}원
      </Text>
    </Box>
  );
};
