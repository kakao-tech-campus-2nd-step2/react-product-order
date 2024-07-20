import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, IconButton, Input, Text, useNumberInput } from '@chakra-ui/react';
import styled from '@emotion/styled';

type Props = {
  productName: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

const QuantityControl = ({ productName, quantity, onQuantityChange }: Props) => {
  const handleChange = (_valueAsString: string, valueAsNumber: number) => {
    onQuantityChange(valueAsNumber);
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    min: 1,
    max: 100,
    value: quantity,
    onChange: handleChange,
  });

  const increment = getIncrementButtonProps();
  const decrement = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Wrapper>
      <Title>{productName}</Title>
      <InputWrapper>
        <StyledIconButton {...decrement} aria-label="수량 1개 감소" icon={<MinusIcon />} />
        <StyledInput {...input} />
        <StyledIconButton {...increment} aria-label="수량 1개 추가" icon={<AddIcon />} />
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  padding: 12px 14px 16px;
  border: 1px solid #ededed;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Title = styled(Text)`
  font-weight: bold;
  margin-bottom: 8px;
`;

const InputWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

const StyledIconButton = styled(IconButton)`
  background-color: #f5f5f5;
  border: 1px solid #ededed;
  &:hover {
    background-color: #e0e0e0;
  }
  padding: 10px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  text-align: center;
  border: 1px solid #ededed;
  border-radius: 4px;
  padding: 10px;
`;

export default QuantityControl;
