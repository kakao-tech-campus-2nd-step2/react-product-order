import { Button, Input, useNumberInput } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface Props {
  name?: string;
  count: string;
  setCount: (value: string) => void;
  limit: number;
}

export const CountOption = ({ name, count, setCount, limit }: Props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: count,
    min: 1,
    max: limit,
    onChange: (num) => {
      setCount(num);
    },
  });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <CountWrapper>
      <Name>{name}</Name>
      <Wrapper>
        <Button {...dec}>-</Button>
        <Input {...input} borderColor={'#ededed'} />
        <Button {...inc}>+</Button>
      </Wrapper>
    </CountWrapper>
  );
};

const CountWrapper = styled.div`
  width: 100%;
  padding: 12px 14px 16px;
  border: 1px solid #ededed;
  border-radius: 2px;
`;
const Name = styled.p`
  font-weight: 700;
  line-height: 22px;
  color: #111;
  word-wrap: break-word;
  word-break: break-all;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8px;
  gap: 8px;
`;
