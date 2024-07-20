import { Button, Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

interface Props {
  price: number;
  cardMessage: string;
}

export const Order = ({ price, cardMessage }: Props) => {
  const [cashReceiptNumber, setCashReceiptNumber] = useState<string>('');
  const [isCashReceiptChecked, setIsCashReceiptChecked] = useState<boolean>(false);

  const handleCashReceiptCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCashReceiptChecked(e.target.checked);
  };

  const handleCashReceiptNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCashReceiptNumber(value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cardMessage.length === 0) {
      alert('카드 메시지를 입력해주세요.');
      return;
    }
    if (cardMessage.length > 100) {
      alert('카드 메시지는 100자 이내로 입력해주세요.');
      return;
    }
    if (isCashReceiptChecked && cashReceiptNumber === '') {
      alert('현금영수증 번호를 입력해주세요.');
      return;
    }
    if (isCashReceiptChecked && !/^[0-9]*$/.test(cashReceiptNumber)) {
      alert('현금영수증 번호는 숫자로만 입력해주세요.');
      return;
    }
    alert('주문이 완료되었습니다.');
  };

  return (
    <Wrapper>
      <OrderInfoTitle>결제 정보</OrderInfoTitle>
      <form onSubmit={handleSubmit}>
        <CashReceiptOption>
          <Checkbox size="lg" colorScheme="yellow" onChange={handleCashReceiptCheckboxChange}>
            <CashReceiptTitle>현금영수증 신청</CashReceiptTitle>
          </Checkbox>
          <div style={{ padding: '5px' }} />
          <Select>
            <option value="개인소득공제">개인소득공제</option>
            <option value="사업자증빙용">사업자증빙용</option>
          </Select>
          <div style={{ padding: '5px' }} />
          <Input
            type="text"
            placeholder="(-없이) 숫자만 입력해주세요."
            onChange={handleCashReceiptNumberChange}
            value={cashReceiptNumber}
          />
        </CashReceiptOption>

        <TotalPriceWrapper>
          <TotalPriceTitle>최종 결제금액</TotalPriceTitle>
          <TotalPrice>{price}원</TotalPrice>
        </TotalPriceWrapper>

        <PaymentButton>
          <Button
            type="submit"
            width="100%"
            height={'60px'}
            bg="#FEE500"
            _hover={{ bg: '#FADA0A' }}
            fontWeight={400}
          >
            {price}원 결제하기
          </Button>
        </PaymentButton>
      </form>
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
