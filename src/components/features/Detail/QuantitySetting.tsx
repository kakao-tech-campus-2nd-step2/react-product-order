import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { Button } from '@/components/common/Button';
type Props = {
  name: string;
};
export const QuantitySetting = ({ name }: Props) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <Container>
      <Title>{name}</Title>
      <Wrapper>
        <Button theme="lightGray" size="small">
          <MinusIcon />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <Button theme="lightGray" size="small">
          <AddIcon />
        </Button>
      </Wrapper>
    </Container>
  );
};
const Container = styled.div`
  border: 1px solid #e2e8f0;
  padding: 10px;
`;
const Title = styled.div`
  font-weight: bold;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 5px;
`;
