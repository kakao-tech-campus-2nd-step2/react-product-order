import React from 'react';
import { Checkbox, Select, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export default function ReceiptForm() {
  const { register } = useFormContext();

  return (
    <form>
      <Checkbox mb={4} fontWeight={700} {...register('hasCashReceipt')}>
        현금영수증 신청
      </Checkbox>
      <Select mb={2} {...register('cashReceiptType')}>
        <option value="개인소득공제">개인소득공제</option>
        <option value="사업자증빙용">사업자증빙용</option>
      </Select>
      <Input placeholder="(-없이) 숫자만 입력해주세요." mb={4} {...register('cashReceiptNumber')} />
    </form>
  );
}
