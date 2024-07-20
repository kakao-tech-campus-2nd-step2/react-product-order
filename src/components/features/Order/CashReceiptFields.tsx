import { Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Spacing } from '@/components/common/layouts/Spacing';

type FormData = {
  hasCashReceipt: boolean;
  cashReceiptType?: string;
  cashReceiptNumber?: string;
};

type Props = {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
};

export const CashReceiptFields = ({ formData, onChange }: Props) => {
  return (
    <Wrapper>
      <Checkbox
        name="hasCashReceipt"
        isChecked={formData.hasCashReceipt}
        onChange={onChange}
        colorScheme="yellow"
        size="lg"
      >
        현금영수증 신청
      </Checkbox>

      <Spacing height={8} />
      {formData.hasCashReceipt && (
        <>
          <Select name="cashReceiptType" value={formData.cashReceiptType} onChange={onChange}>
            <option value="PERSONAL">개인소득공제</option>
            <option value="BUSINESS">사업자증빙용</option>
          </Select>
          <Spacing height={8} />
          <Input
            name="cashReceiptNumber"
            value={formData.cashReceiptNumber}
            onChange={onChange}
            placeholder="(-없이) 숫자만 입력해주세요."
          />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
`;

export default CashReceiptFields;
