import { Textarea } from '@chakra-ui/react';
import styled from '@emotion/styled';
import type { FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FieldValues>;
};
export const MessageBox = ({ register }: Props) => {
  return (
    <Wrapper>
      <Title>나에게 주는 선물</Title>
      <Textarea
        placeholder="선물과 함께 보낼 메시지를 적어보세요."
        {...register('message', {
          required: '메시지를 입력해주세요',
          maxLength: { value: 100, message: '메시지는 100자 이내로 작성해주세요.' },
        })}
      />
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
