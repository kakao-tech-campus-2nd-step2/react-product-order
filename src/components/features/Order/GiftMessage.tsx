import { Textarea } from '@chakra-ui/react';
import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';

interface Props {
  cardMessage: string;
  setCardMessage: (message: string) => void;
}

export const GiftMessage = ({ cardMessage, setCardMessage }: Props) => {
  const handleCardMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value;
    setCardMessage(message);
  };

  return (
    <div>
      <Wrapper>
        <MessageCardTitle>나에게 주는 선물</MessageCardTitle>
        <TextareaWrapper>
          <Textarea
            placeholder="선물과 함께 보낼 메시지를 적어보세요"
            resize="none"
            height="100"
            onChange={handleCardMessageChange}
            variant="filled"
            value={cardMessage}
          />
        </TextareaWrapper>
      </Wrapper>
    </div>
  );
};

const MessageCardTitle = styled.span`
  display: block;
  text-align: center;
  font-size: 18px;
  line-height: 21px;
  color: rgb(34, 34, 34);
  box-sizing: border-box;
  font-weight: 700;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 14px 30px;
`;

const TextareaWrapper = styled.div`
  width: 100%;
  padding: 12px 30px 16px;
`;
