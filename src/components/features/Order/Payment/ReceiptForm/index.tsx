import React from 'react';
import { Checkbox, Select, Input } from '@chakra-ui/react';

interface ReceiptFormProps {
  hasCashRecipt: boolean;
  cashReciptType: string;
  cashReciptNumber: string;
  onInputChange: (name: string, value: any) => void;
}

export default function ReceiptForm({
  hasCashRecipt,
  cashReciptType,
  cashReciptNumber,
  onInputChange,
}: ReceiptFormProps) {
  return (
    <form>
      <Checkbox
        mb={4}
        fontWeight={700}
        isChecked={hasCashRecipt}
        onChange={(e) => onInputChange('hasCashRecipt', e.target.checked)}
      >
        현금영수증 신청
      </Checkbox>
      <Select mb={2} value={cashReciptType} onChange={(e) => onInputChange('cashReciptType', e.target.value)}>
        <option value="개인소득공제">개인소득공제</option>
        <option value="사업자증빙용">사업자증빙용</option>
      </Select>
      <Input
        placeholder="(-없이) 숫자만 입력해주세요."
        mb={4}
        value={cashReciptNumber}
        onChange={(e) => onInputChange('cashReciptNumber', e.target.value)}
      />
    </form>
  );
}
