import { Textarea } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import { errors } from '../Errors';

type MessageFormProps = {
  onMessageChange: (message: string) => void;
};

export const MessageFormSection = ({ onMessageChange }: MessageFormProps) => {
  const { control } = useFormContext();

  return (
    <Wrapper>
      <Header>
        <span>나에게 주는 선물</span>
      </Header>
      <MessageForm>
        <Controller
          name="message"
          control={control}
          rules={{
            required: errors.messageValid,
            maxLength: {
              value: 100,
              message: errors.messageType,
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Textarea
                name="messageCardTextMessage"
                placeholder="선물과 함께 보낼 메시지를 적어보세요"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  onMessageChange(e.target.value);
                }}
              />
              {error && <ErrorText>{error.message}</ErrorText>}
            </>
          )}
        />
      </MessageForm>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 44px 0px 32px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  span {
    font-size: 18px;
    line-height: 21px;
    color: rgb(34, 34, 34);
    box-sizing: border-box;
    font-weight: 700;
  }
`;

const MessageForm = styled.div`
  width: 100%;
  padding: 12px 30px 16px;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 8px;
  display: block;
`;
