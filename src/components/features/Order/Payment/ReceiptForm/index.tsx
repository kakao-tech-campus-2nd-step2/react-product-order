import React from 'react';
import { Checkbox, Select, Input } from '@chakra-ui/react';

export default function ReceiptForm() {
  return (
    <form>
      <Checkbox mb={4} fontWeight={700}>
        현금영수증 신청
      </Checkbox>
      <Select mb={2}>
        <option value="개인소득공제">개인소득공제</option>
        <option value="사업자증빙용">사업자증빙용</option>
      </Select>
      <Input placeholder="(-없이) 숫자만 입력해주세요." mb={4} />
    </form>
  );
}
