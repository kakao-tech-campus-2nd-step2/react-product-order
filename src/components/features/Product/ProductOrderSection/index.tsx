import { Button, Container, Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput,NumberInputField,NumberInputStepper,Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getDynamicPath } from '@/routes/path';
import type { GoodsData } from '@/types';

export const ProductOrderSection = (data: GoodsData) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleQuantityChange = (value: string) => {
    setQuantity(parseInt(value));
  };

  const handleGiftClick = () => {
    const authToken = sessionStorage.getItem('authToken');

    if (!authToken) {
      navigate(getDynamicPath.login());
    }
    else {
      navigate(getDynamicPath.order(data.id), { state: { quantity }});
    }
  };

  return (
    <Container
      as='aside'
      position='sticky'
      top='54px'
      w='100%'
      maxW='360px'
      h='calc(-54px + 100vh)'
    >
      <Flex
        w='100%'
        padding='30px 12px 30px 30px'
        h='100%'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Container
          w='100%'
          padding='12px 14px 16px'
          border='1px solid rgb(237, 237, 237)'
          borderRadius='2px'
        >
          <Text
            fontWeight={700}
            lineHeight='22px'
            color='rgb(17, 17, 17)'
            overflowWrap='break-word'
            wordBreak='break-all'
          >
            {data.name}
          </Text>
          <Flex
            justifyContent='center'
            paddingTop='8px'
            gap='8px'
          >
            <NumberInput
              w='100%'
              defaultValue={1}
              min={1}
              max={100}
              onChange={handleQuantityChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </Container>
        <Container padding='12px 0px 0px'>
          <Flex
            marginBottom='20px'
            padding='18px 20px'
            borderRadius='4px'
            backgroundColor='rgb(245, 245, 245)'
            justifyContent='space-between'
            fontSize='14px'
            fontWeight={700}
            lineHeight='14px'
            color='rgb(17, 17, 17)'
          >
            총 결제 금액
            <Text
              fontSize='20px'
              fontWeight={700}
              lineHeight='14px'
              color='rgb(17, 17, 17)'
            >
              {data.price.sellingPrice * quantity}원
            </Text>
          </Flex>
          <Button
            w='100%'
            boxSizing='border-box'
            borderRadius='4px'
            cursor='pointer'
            h='60px'
            fontSize='16px'
            color='rgb(255, 255, 255)'
            backgroundColor='rgb(17, 17, 17)'
            onClick={handleGiftClick}
          >
            나에게 선물하기
          </Button>
        </Container>
      </Flex>
    </Container>
  );
};