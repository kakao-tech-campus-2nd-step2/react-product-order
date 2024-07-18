import { Button, Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface Props {
  price: number;
}

export const OrderInfo = ({ price }: Props) => {
  return (
    <Wrapper>
      <OrderInfoTitle>결제 정보</OrderInfoTitle>
      <CashReceiptOption>
        <Checkbox size="lg" colorScheme="yellow">
          <CashReceiptTitle>현금영수증 신청</CashReceiptTitle>
        </Checkbox>
        <div style={{ padding: '5px' }} />
        <Select>
          <option value="개인소득공제">개인소득공제</option>
          <option value="사업자증빙용">사업자증빙용</option>
        </Select>
        <div style={{ padding: '5px' }} />
        <Input type="CashReceipt" placeholder="(-없이) 숫자만 입력해주세요." />
      </CashReceiptOption>
      <TotalPriceWrapper>
        <TotalPriceTitle>최종 결제금액</TotalPriceTitle>
        <TotalPrice>{price}원</TotalPrice>
      </TotalPriceWrapper>
      <PaymentButton>
        <Button
          width="100%"
          height={'60px'}
          bg="#FEE500"
          _hover={{ bg: '#FADA0A' }}
          fontWeight={400}
        >
          {price}원 결제하기
        </Button>
      </PaymentButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 360px;
  height: 100%;
  border-left: 1px solid rgb(237, 237, 237);
  border-right: 1px solid rgb(237, 237, 237);
  padding: 16px;
  z-index: 20;
`;

const OrderInfoTitle = styled.span`
  display: block;
  text-align: left;
  font-size: 18px;
  line-height: 21px;
  color: rgb(34, 34, 34);
  box-sizing: border-box;
  font-weight: 700;
  padding-left: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgb(237, 237, 237);
`;

const CashReceiptOption = styled.div`
  width: 100%;
  padding: 16px;
`;

const CashReceiptTitle = styled.p`
  font-size: 15px;
  line-height: 24px;
  font-weight: 700;
  color: rgb(0, 0, 0);
`;

const TotalPriceTitle = styled.span`
  font-size: 15px;
  line-height: 24px;
  font-weight: 700;
  color: rgb(0, 0, 0);
`;

const TotalPrice = styled.span`
  font-size: 18px;
  line-height: 21px;
  color: rgb(34, 34, 34);
  box-sizing: border-box;
  font-weight: 700;
`;

const TotalPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px;
  border-top: 1px solid rgb(237, 237, 237);
  border-bottom: 1px solid rgb(237, 237, 237);
`;

const PaymentButton = styled.div`
  margin-top: 16px;
  width: 100%;
  padding-right: 30px;
`;
