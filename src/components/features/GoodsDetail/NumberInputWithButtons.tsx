import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { IconButton, Input, useNumberInput, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface NumberInputWithButtonsProps {
  label: string;
}

const NumberInputWithButtons = ({ label }: NumberInputWithButtonsProps) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <VStack maxW="320px" padding="10px" borderRadius="3" borderColor="gray.200" borderWidth="1px">
      <StyledLabel>{label}</StyledLabel>
      <NumberInputWrapper>
        <IconButton aria-label="Decrease value" {...dec} icon={<MinusIcon />} />
        <Input {...input} />
        <IconButton aria-label="Increase value" {...inc} icon={<AddIcon />} />
      </NumberInputWrapper>
    </VStack>
  );
};

export default NumberInputWithButtons;

const StyledLabel = styled.p`
  font-weight: 700;
  line-height: 22px;
  color: rgb(17, 17, 17);
  overflow-wrap: break-word;
  word-break: break-all;
`;

const NumberInputWrapper = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: row;
  border-width: 0px;
  border-style: solid;
  box-sizing: border-box;
  overflow-wrap: break-word;
`;
