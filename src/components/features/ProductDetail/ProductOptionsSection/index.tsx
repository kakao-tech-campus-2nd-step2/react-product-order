import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, IconButton, Input, Spacer, Text, VStack } from '@chakra-ui/react';

import type { GoodsData } from '@/types';

interface Props {
  product: GoodsData;
}

export const ProductOptionsSection = ({ product }: Props) => {
  const { name, price } = product;

  return (
    <VStack>
      <Box border="1px" borderColor="blackAlpha.100" p={4}>
        <Text fontSize="md" as="b">
          {name}
        </Text>
        <HStack mt={2}>
          <IconButton aria-label="Add" icon={<MinusIcon />} />
          <Input width="100%" />
          <IconButton aria-label="Add" icon={<AddIcon />} />
        </HStack>
      </Box>
      <Spacer />
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
          {price.sellingPrice}원
        </Text>
      </Box>
      <Button borderRadius="md" bg="blackAlpha.900" width="100%" color="white" p={2} mb={16}>
        나에게 선물하기
      </Button>
    </VStack>
  );
};
