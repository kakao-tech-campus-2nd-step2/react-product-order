import React from 'react';
import styled from '@emotion/styled';
import { Input, Button, useNumberInput, HStack } from '@chakra-ui/react';

export default function QuantitySelector() {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <QuantitySelectorConatiner>
      <Title>[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)</Title>
      <HStack maxW="320px">
        <Button {...dec}>-</Button>
        <Input {...input} />
        <Button {...inc}>+</Button>
      </HStack>
    </QuantitySelectorConatiner>
  );
}

const QuantitySelectorConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 14px 16px;
  border: 1px solid rgb(237, 237, 237);
  border-radius: 2px;
`;

const Title = styled.p`
  font-weight: 700;
  margin-bottom: 12px;
`;
