import { Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import type { Control } from 'react-hook-form';
import { Controller, type FieldValues, type UseFormRegister } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import { useBuyInfo } from '@/provider/BuyInfo';

type Props = {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
};

export const PaymentInfo = ({ register, control }: Props) => {
  const { price, quantity } = useBuyInfo();
  const [isCashResceipts, setIsCashReceipts] = useState(false);
  const totalPrice = price * quantity;

  return (
    <Container>
      <Title>결제정보</Title>
      <Wrapper>
        <Controller
          name="isCashResceipts"
          control={control}
          render={({ field }) => (
            <Checkbox
              size="lg"
              colorScheme="orange"
              fontWeight="bold"
              checked={isCashResceipts}
              onChange={() => {
                field.onChange(!isCashResceipts);
                setIsCashReceipts(!isCashResceipts);
              }}
            >
              현금영수증 신청
            </Checkbox>
          )}
        />
        {/* TODO:select기본값 개인으로 세팅하기 */}
        <Select {...register('receipts_option', { value: '개인' })} disabled={!isCashResceipts}>
          <option value="개인">개인소득공제</option>
          <option value="사업자">사업자증빙용</option>
        </Select>
        <Input
          type="text"
          {...register('phone', {
            required: { value: isCashResceipts, message: '전화번호를 입력해주세요.' },
            pattern: { value: /[0-9]{11}/, message: '전화번호는 숫자만 입력해주세요.' },
          })}
          placeholder="(-없이) 숫자만 입력해주세요."
          disabled={!isCashResceipts}
        />
      </Wrapper>
      <TotalPrice>
        <div>최종 결제 금액</div>
        {totalPrice}원
      </TotalPrice>
      <Button>{totalPrice}원 결제하기</Button>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  border-left: 1px solid rgb(237, 237, 237);
  padding: 20px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
  border-top: 1px solid rgb(237, 237, 237);
  border-bottom: 1px solid rgb(237, 237, 237);
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  border-bottom: 1px solid rgb(237, 237, 237);
  padding: 20px;
  margin-bottom: 20px;
`;
