import { Controller } from 'react-hook-form';
import { Checkbox, Divider, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Button } from '@/components/common/Button';

type PaymentOptionProps = {
  allPrice: string | null;
  control: any;
  errors: any;
  cashReceipt: boolean;
};

export const PaymentOption = ({
  allPrice,
  control,
  errors,
  cashReceipt,
}: PaymentOptionProps) => {
  return (
    <Wrapper>
      <InsideWrapper>
        <PaymentTitle>
          <Title>결제 정보</Title>
        </PaymentTitle>
        <Divider />
        <Receipt>
          <Controller
            name="cashReceipt"
            control={control}
            render={({ field }) => (
              <Checkbox
                style={{ fontWeight: "700" }}
                isChecked={field.value}
                onChange={field.onChange}>현금영수증 신청</Checkbox>
            )}
          />
          <Space />
          <Select defaultValue='personal'>
            <option value='personal'>개인소득공제</option>
            <option value='business'>사업자증빙용</option>
          </Select>
          <Space2 />
          <Controller
            name="cashReceiptNumber"
            control={control}
            render={({ field }) => (
              <Input
                type='number'
                placeholder='(-없이) 숫자만 입력해주세요'
                value={field.value ?? ''}
                onChange={field.onChange}
                isDisabled={!cashReceipt}
              />
            )}
          />
          {errors.cashReceiptNumber && <p>{errors.cashReceiptNumber.message}</p>}
        </Receipt>
        <Divider />
        <ResultPayment>
          <ResultTitle>최종 결제금액</ResultTitle>
          <ResultPrice>{allPrice}원</ResultPrice>
        </ResultPayment>
        <Divider />
        <Space3 />
        <Button type='submit'>{allPrice}원 결제하기</Button>
      </InsideWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  display: block;
  position: sticky;
  top: 54px;
  width: 100%;
  max-width: 360px;
  height: calc(-54px + 100vh);
`;

const InsideWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid rgb(237, 237, 237);
  border-right: 1px solid rgb(237, 237, 237);
  padding: 16px;
`

const PaymentTitle = styled.h6`
  padding: 24px 0px 20px;
  font-style: normal;
  font-weight: 400;
`

const Title = styled.span`
  font-size: 18px;
  line-height: 21px;
  color: rgb(34, 34, 34);
  box-sizing: border-box;
  font-weight: 700;
`

const Receipt = styled.div`
  width: 100%;
  padding: 16px;
`

const Space = styled.div`
  width: 100%;
  background-color: inherit;
  height: 16px;
`

const Space2 = styled.div`
  width: 100%;
  background-color: inherit;
  height: 8px;
`

const Space3 = styled.div`
  width: 100%;
  background-color: inherit;
  height: 32px;
`

const ResultPayment = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
`

const ResultTitle = styled.span`
  font-size: 15px;
  line-height: 24px;
  font-weight: 700;
  color: rgb(0, 0, 0);
`

const ResultPrice = styled.span`
  font-size: 18px;
  line-height: 21px;
  color: rgb(34, 34, 34);
  box-sizing: border-box;
  font-weight: 700;
`