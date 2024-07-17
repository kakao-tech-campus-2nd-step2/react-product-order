import { Textarea } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const MessageBox = () => {
  return (
    <Wrapper>
      <Title>나에게 주는 선물</Title>
      <Textarea placeholder="선물과 함께 보낼 메시지를 적어보세요." name="message" />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 30px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
