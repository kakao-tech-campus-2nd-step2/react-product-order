import { Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Spacing } from '@/components/common/layouts/Spacing';
import type { FormData } from '@/types';

import { LabelText } from '../Common/LabelText';

type Props = {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CashReceiptFields = ({ formData, handleInputChange, handleCheckboxChange }: Props) => {
  return (
    <Wrapper>
      <Checkbox
        colorScheme="yellow"
        size="lg"
        name="hasCashReceipt"
        isChecked={formData.hasCashReceipt}
        onChange={handleCheckboxChange}
      >
        <LabelText>현금영수증 신청</LabelText>
      </Checkbox>

      <Spacing />
      <Select
        name="cashReceiptType"
        value={formData.cashReceiptType}
        onChange={handleInputChange}
        isDisabled={!formData.hasCashReceipt}
      >
        <option value="PERSONAL">개인소득공제</option>
        <option value="BUSINESS">사업자증빙용</option>
      </Select>
      <Spacing height={8} />
      <Input
        name="cashReceiptNumber"
        value={formData.cashReceiptNumber}
        onChange={handleInputChange}
        placeholder="(-없이) 숫자만 입력해주세요."
        isDisabled={!formData.hasCashReceipt}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
`;
