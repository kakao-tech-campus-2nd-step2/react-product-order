import type { SelectProps } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const OrderCashReceiptSelect = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => (
  <Select ref={ref} placeholder="현금영수증 타입을 선택해주세요" {...props} defaultValue="PERSONAL">
    <option value="PERSONAL">개인소득공제</option>
    <option value="BUSINESS">사업자증빙용</option>
  </Select>
));
