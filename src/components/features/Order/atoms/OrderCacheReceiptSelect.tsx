import { forwardRef, Select } from '@chakra-ui/react';

export const OrderCashReceiptSelect = forwardRef((props, ref) => (
  <Select ref={ref} placeholder="현금영수증 타입을 선택해주세요" {...props} defaultValue="PERSONAL">
    <option value="PERSONAL">개인소득공제</option>
    <option value="BUSINESS">사업자증빙용</option>
  </Select>
));
