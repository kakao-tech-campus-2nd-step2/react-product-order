import { Textarea } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const MessageCard = () => {
  return (
    <MessageCardWrapper>
      <Title>나에게 주는 선물</Title>
      <MessageCardForm>
        <Textarea
          placeholder="선물과 함께 보낼 메시지를 적어보세요"
          resize="none"
          height="100"
          variant="filled"
          colorScheme="gray"
        />
      </MessageCardForm>
    </MessageCardWrapper>
  );
};
const MessageCardWrapper = styled.div`
  width: 100%;
  padding: 30px 12px 30px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;
const Title = styled.h1`
  padding: 24px 12px;
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
  color: #111;
`;

const MessageCardForm = styled.div`
  width: 100%;
  padding: 12px 30px 16px;
`;
