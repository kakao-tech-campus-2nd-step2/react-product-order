import React, { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import { Textarea } from '@chakra-ui/react';
import GiftDetail from '../GiftDetail';

const MAX_MESSAGE_LENGTH = 100;

interface OrderMessageProps {
  message: string;
  onMessageChange: (name: string, message: string) => void;
}

export default function OrderMessage({ message, onMessageChange }: OrderMessageProps) {
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (value.length > MAX_MESSAGE_LENGTH) {
      setIsInvalid(true);
    } else {
      onMessageChange(name, value);
    }
  };

  return (
    <OrderMessageContainer>
      <Message>
        <Title>나에게 주는 선물</Title>
        <Textarea
          placeholder="선물과 함께 보낼 메시지를 적어보세요"
          name="message"
          value={message}
          onChange={handleMessageChange}
          isInvalid={isInvalid}
        />
      </Message>
      <GiftDetail />
    </OrderMessageContainer>
  );
}

const OrderMessageContainer = styled.main`
  width: 850px;
  padding: 48px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 28px;
`;

const Message = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;
`;
