import { Box, Text, useColorModeValue } from '@chakra-ui/react';

export interface IReceiptPrice {
  price: number;
}

export const ReceiptPrice = ({ price }: IReceiptPrice) => {
  return (
    <Box
      mb="20px"
      p="18px 20px"
      borderRadius="4px"
      bg={useColorModeValue('#f5f5f5', '#2D3748')}
      width="100%"
    >
      <Text
        fontSize="14px"
        display="flex"
        justifyContent="space-between"
        fontWeight="700"
        lineHeight="14px"
        color="#111"
      >
        총 결제 금액
        <Text as="span" fontSize="20px" letterSpacing="-0.02em">
          {price}원
        </Text>
      </Text>
    </Box>
  );
};
