import { Text } from '@chakra-ui/react';

export interface IPrice {
  price: number;
}

export const Price = ({ price }: IPrice) => (
  <Text
    width="100%"
    minH="120px"
    pt="16px"
    fontSize="30px"
    fontWeight="400"
    lineHeight="52px"
    color="#222"
  >
    {price}원
  </Text>
);
