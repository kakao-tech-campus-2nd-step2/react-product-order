import { Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { forwardRef, useState } from 'react';

export const CashReceipt = forwardRef<HTMLInputElement, { checked: boolean; setChecked: (checked: boolean) => void }>(
  ({ checked, setChecked }, ref) => {
    const [value, setValue] = useState('');

    return (
      <CashReceiptWrapper>
        <Checkbox
          isChecked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          borderColor="#e6e6e6"
          size="lg"
          padding="10px 0px"
          colorScheme="yellow"
        >
          <Label>현금영수증 신청</Label>
        </Checkbox>
        <Select borderColor="#e6e6e6">
          <option value="option1">개인소득공제</option>
          <option value="option2">사업자증빙용</option>
        </Select>
        <Input
          placeholder="(-없이) 숫자만 입력해주세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          borderColor="#e6e6e6"
          ref={ref}
        />
      </CashReceiptWrapper>
    );
  },
);
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
