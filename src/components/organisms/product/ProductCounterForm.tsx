import Container from '@components/atoms/container/Container';
import {
  Box, Button, HStack, Input, Text, useNumberInput,
} from '@chakra-ui/react';
import { defaultBorderColor } from '@styles/colors';
import { ProductDetailData } from '@/dto';

interface ProductCounterAreaProps {
  productDetails: ProductDetailData;
}

function ProductCounterForm({ productDetails }: ProductCounterAreaProps) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 100,
  });

  return (

    <Container flexDirection="column" elementSize="full-width" maxWidth="360px">
      <Container padding="30px 12px 30px 30px">
        <Box
          w="100%"
          padding="12px 14px 16px"
          border="rgb(237, 237, 237) 1px solid"
          display="flex"
          flexDirection="column"
        >
          <Text fontWeight="bold">{productDetails.name}</Text>
          <HStack w="100%" paddingTop="10px">
            <Button {...getDecrementButtonProps()}>-</Button>
            <Input {...getInputProps()} borderColor={defaultBorderColor} />
            <Button {...getIncrementButtonProps()}>+</Button>
          </HStack>
        </Box>
      </Container>
    </Container>
  );
}

export default ProductCounterForm;
