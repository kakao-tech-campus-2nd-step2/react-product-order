import Container from '@components/atoms/container/Container';
import { defaultBorderColor } from '@styles/colors';
import {
  Checkbox, Divider, Input, Select, Text,
} from '@chakra-ui/react';
import { ChangeEvent, useCallback, useState } from 'react';
import Button from '@components/atoms/button/Button';
import { ProductDetailData } from '@/dto';
import { CashReceiptOptions } from '@/constants';
import { CashReceiptType } from '@/types';

interface ProductOrderFormProps {
  productDetails: ProductDetailData;
  count: number;
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

function ProductOrderForm({ productDetails, count }: ProductOrderFormProps) {
  const [cashReceiptType, setCashReceiptType] = useState<CashReceiptType>(
    CashReceiptOptions.PERSONAL,
  );

  const handleSelectChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCashReceiptType(e.target.value);
  }, [setCashReceiptType]);

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
        <Checkbox borderColor={defaultBorderColor}>
          현금영수증 신청
        </Checkbox>
        <Select
          paddingTop="16px"
          onChange={handleSelectChange}
          borderColor={defaultBorderColor}
          defaultValue={cashReceiptType}
        >
          <option value={CashReceiptOptions.PERSONAL}>
            {cashReceiptTypeText[CashReceiptOptions.PERSONAL]}
          </option>
          <option value={CashReceiptOptions.BUSINESS}>
            {cashReceiptTypeText[CashReceiptOptions.BUSINESS]}
          </option>
        </Select>
        <Input borderColor={defaultBorderColor} marginTop="5px" />
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
      />
    </Container>
  );
}

export default ProductOrderForm;
