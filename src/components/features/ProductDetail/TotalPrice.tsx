import { HStack, Spacer, Text } from '@chakra-ui/react';

interface TotalPriceProps {
  totalPrice: number;
}

export const TotalPrice = ({ totalPrice }: TotalPriceProps) => {
  return (
    <HStack width="320px" borderRadius="16px" bg="gray.50" py="18px" px="20px">
      <Text fontSize="14px" fontWeight="bold">
        총 결제 금액
      </Text>

      <Spacer />

      <Text fontSize="14px" fontWeight="bold">
        {totalPrice} 원
      </Text>
    </HStack>
  );
};
