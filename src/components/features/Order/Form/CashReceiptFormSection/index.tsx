import { Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Controller, useFormContext } from 'react-hook-form';

import { FormContainer } from '../../OrderAsideSection/component';
import { Gap } from '../../OrderMainSection/component';
import { errors } from '../Errors';

type CashReceiptFormProps = {
  onReceiptDataChange: (data: CashReceiptData) => void;
};

type CashReceiptData = {
  isReceiptChecked: boolean;
  receiptNumber: string;
};

export const CashReceiptForm = ({ onReceiptDataChange }: CashReceiptFormProps) => {
  const { control, watch } = useFormContext<CashReceiptData>();
  const cashReceiptData = watch();

  return (
    <FormContainer>
      <Controller
        name="isReceiptChecked"
        control={control}
        render={({ field }) => (
          <Checkbox
            colorScheme="orange"
            isChecked={field.value}
            onChange={(e) => {
              field.onChange(e.target.checked);
              onReceiptDataChange({ ...cashReceiptData, isReceiptChecked: e.target.checked });
            }}
          >
            현금영수증 신청
          </Checkbox>
        )}
      />
      <Gap />
      <Select name="cashReceiptType">
        <option value="PERSONAL">개인소득공제</option>
        <option value="BUSINESS">사업자증빙용</option>
      </Select>
      <div style={{ height: '8px' }} />
      <Controller
        name="receiptNumber"
        control={control}
        rules={{
          required: cashReceiptData.isReceiptChecked ? errors.cashReceiptValid : '',
          validate: {
            isNumber: (value) => (!isNaN(Number(value)) ? true : errors.cashReceiptType),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              {...field}
              name="cashReceiptNumber"
              placeholder="(-없이) 숫자만 입력해주세요."
              onChange={(e) => {
                field.onChange(e.target.value);
                onReceiptDataChange({ ...cashReceiptData, receiptNumber: e.target.value });
              }}
            />
            {error && <ErrorText>{error.message}</ErrorText>}
          </>
        )}
      />
    </FormContainer>
  );
};

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 8px;
  display: block;
`;