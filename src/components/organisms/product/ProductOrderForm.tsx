import Container from '@components/atoms/container/Container';
import { defaultBorderColor, textColors } from '@styles/colors';
import {
  Checkbox, Divider, Input, Select, Text,
} from '@chakra-ui/react';
import Button from '@components/atoms/button/Button';
import {
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import { FormErrorMessages } from '@constants/ErrorMessage';
import { CashReceiptOptions } from '@/constants';
import { OrderFormData } from '@/types';
import { ProductDetailData } from '@/dto';

interface ProductOrderFormProps<T extends FieldValues> {
  register: UseFormRegister<T>,
  errors: FieldErrors<T>,
  getValues: UseFormGetValues<T>,
  productDetails: ProductDetailData,
  count: number,
}

function InternalFormDivider() {
  return (
    <Divider
      borderBottomColor={defaultBorderColor}
      borderBottomWidth="2px"
      flexDirection="column"
    />
  );
}

function ProductOrderForm({
  register, errors, getValues, productDetails, count,
}: ProductOrderFormProps<OrderFormData>) {
  const cashReceiptTypeText = {
    [CashReceiptOptions.PERSONAL]: '개인소득공제',
    [CashReceiptOptions.BUSINESS]: '사업자증빙용',
  };
  const finalPrice = productDetails.price.sellingPrice * count;

  return (
    <Container
      elementSize={{
        width: '100%',
        height: '100%',
      }}
      padding="16px"
      flexDirection="column"
      cssProps={{
        borderLeft: `1px solid ${defaultBorderColor}`,
      }}
    >
      <Text padding="16px 0" fontWeight="bold">
        결제 정보
      </Text>
      <InternalFormDivider />
      <Container
        elementSize="full-width"
        padding="16px"
        flexDirection="column"
      >
        <Checkbox
          borderColor={defaultBorderColor}
          {...register('hasCashReceipt')}
        >
          현금영수증 신청
        </Checkbox>
        <Select
          paddingTop="16px"
          borderColor={defaultBorderColor}
          {...register('cashReceiptType')}
        >
          <option value={CashReceiptOptions.PERSONAL}>
            {cashReceiptTypeText[CashReceiptOptions.PERSONAL]}
          </option>
          <option value={CashReceiptOptions.BUSINESS}>
            {cashReceiptTypeText[CashReceiptOptions.BUSINESS]}
          </option>
        </Select>
        <Input
          borderColor={defaultBorderColor}
          marginTop="5px"
          {...register('cashReceiptNumber', {
            required: {
              value: getValues().hasCashReceipt,
              message: FormErrorMessages.RECEIPT_NUMBER_REQUIRED,
            },
            pattern: {
              value: /^[0-9]*$/,
              message: FormErrorMessages.RECEIPT_NUMBER_NOT_NUMERIC,
            },
          })}
        />
        {
          errors.cashReceiptNumber ? (
            <Text color={textColors.error}>{errors.cashReceiptNumber.message}</Text>
          ) : null
        }
      </Container>
      <InternalFormDivider />
      <Container elementSize="full-width" justifyContent="space-between" padding="16px">
        <Text>최종 결제금액</Text>
        <Text fontWeight="bold">
          {`${finalPrice}원`}
        </Text>
      </Container>
      <InternalFormDivider />

      <Button
        theme="kakao"
        text={`${finalPrice}원 결제하기`}
        elementSize="big"
        style={{
          marginTop: '16px',
        }}
        type="submit"
      />
    </Container>
  );
}

export default ProductOrderForm;
