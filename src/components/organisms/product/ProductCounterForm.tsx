import Container from '@components/atoms/container/Container';
import {
  Box, Button, HStack, Input, Text, useNumberInput,
} from '@chakra-ui/react';
import { backgroundColors, defaultBorderColor } from '@styles/colors';
import DefaultButton from '@components/atoms/button/Button';
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

    <Container
      flexDirection="column"
      elementSize={{
        width: '100%',
        height: '100%',
      }}
      maxWidth="360px"
      justifyContent="space-between"
      padding="30px 12px 30px 30px"
    >
      <Container>
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
      <Container flexDirection="column" cssProps={{ gap: '16px' }}>
        <Box
          w="100%"
          padding="18px 20px"
          backgroundColor={backgroundColors.root}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>총 결제 금액</Text>
          <Text fontWeight="bold" fontSize="lg">
            {productDetails.price.sellingPrice}
            원
          </Text>
        </Box>
        <DefaultButton
          theme="black"
          text="나에게 선물하기"
          elementSize="big"
          style={{
            fontSize: '15px',
          }}
        />
      </Container>
    </Container>
  );
}

export default ProductCounterForm;
