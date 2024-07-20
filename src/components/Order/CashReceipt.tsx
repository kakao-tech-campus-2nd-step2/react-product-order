import { Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

import type { FormValues } from '@/pages/OrderPage';

export const CashReceipt = () => {
  const { register } = useFormContext<FormValues>();
  return (
    <CashReceiptWrapper>
      <Checkbox {...register('cashReceipt')} borderColor="#e6e6e6" size="lg" padding="10px 0px" colorScheme="yellow">
        <Label>현금영수증 신청</Label>
      </Checkbox>
      <Select {...register('receiptType')} borderColor="#e6e6e6">
        <option value="option1">개인소득공제</option>
        <option value="option2">사업자증빙용</option>
      </Select>
      <Input placeholder="(-없이) 숫자만 입력해주세요." {...register('number')} borderColor="#e6e6e6" />
    </CashReceiptWrapper>
  );
};
const CashReceiptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 10px;
  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: #111;
`;
const Label = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 14px;
  color: #111;
`;
