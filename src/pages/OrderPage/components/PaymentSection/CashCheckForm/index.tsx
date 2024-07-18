import { Checkbox, Input, Select } from '@chakra-ui/react';

import { OrderFormType } from '@/types/orderType';

import { Container } from '@/components/ui/Layout/Container';
import { Text } from '@/components/ui/Text';

type CashCheckFormProps = {
  formData: OrderFormType;
  handleCheckboxChange: (checkboxField: keyof OrderFormType) => void;
  handleInputChange: (inputField: keyof OrderFormType, value: string) => void;
};

export const CashCheckForm = ({
  formData,
  handleCheckboxChange,
  handleInputChange,
}: CashCheckFormProps) => {
  return (
    <Container flexDirection="column" gap="1rem">
      <Checkbox
        size="lg"
        onChange={() => handleCheckboxChange('isCashChecked')}
      >
        <Text isBold>현금영수증 신청</Text>
      </Checkbox>
      <Container flexDirection="column" gap="0.5rem">
        <Select
          value={formData.cashReceiptType}
          onChange={(e) => handleInputChange('cashReceiptType', e.target.value)}
        >
          <option value="개인소득공제">개인소득공제</option>
          <option value="사업자증빙용">사업자증빙용</option>
        </Select>
        <Input
          placeholder="(-없이) 숫자만 입력해주세요."
          value={formData.cashReceiptNumber}
          onChange={(e) =>
            handleInputChange('cashReceiptNumber', e.target.value)
          }
        />
      </Container>
    </Container>
  );
};
