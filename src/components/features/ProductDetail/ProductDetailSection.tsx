import { Box, Text, VStack } from '@chakra-ui/react';

interface ProductDetailsProps {
  name?: string;
  sellingPrice?: number;
}

export const ProductDetailSection = ({ name, sellingPrice }: ProductDetailsProps) => {
  return (
    <VStack w="386px" h="450px" pt="24px" pl="12px" align="flex-start" justify="flex-start">
      <Text fontSize="24px" fontWeight={'regular'}>
        {name}
      </Text>

      <Text pt="16px" fontSize="30px" fontWeight="regular" h="120px">
        {sellingPrice} 원
      </Text>

      <Box borderTop="1px" borderBottom="1px" borderColor="gray.200">
        <Text fontSize="14px" fontWeight="bold" py="24px" px="12px">
          카톡 친구가 아니어도 선물 코드로 선물할 수 있어요!
        </Text>
      </Box>
    </VStack>
  );
};
