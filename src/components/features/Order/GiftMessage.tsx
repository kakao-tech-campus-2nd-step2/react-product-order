import { Textarea } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

export const GiftMessage = () => {
  const { control } = useFormContext();

  return (
    <div>
      <Wrapper>
        <MessageCardTitle>나에게 주는 선물</MessageCardTitle>
        <TextareaWrapper>
          <Controller
            name="cardMessage"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Textarea
                placeholder="선물과 함께 보낼 메시지를 적어보세요"
                resize="none"
                height="100"
                variant="filled"
                {...field}
              />
            )}
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
