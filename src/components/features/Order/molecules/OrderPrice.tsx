import { Heading, HStack, Text } from '@chakra-ui/react';

export interface IOrderPrice {
  totalPrice: number;
}

export const OrderPrice = ({ totalPrice }: IOrderPrice) => (
  <HStack width="100%" justifyContent="space-between" padding="16px">
    <Text fontSize="md" fontWeight="bold">
      최종 결제금액
    </Text>
    <Heading as="h3" size="md">
      {totalPrice}원
    </Heading>
  </HStack>
);
