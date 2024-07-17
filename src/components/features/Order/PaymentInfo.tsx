import { Checkbox, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { useBuyInfo } from '@/provider/BuyInfo';

export const PaymentInfo = () => {
  const { price, quantity } = useBuyInfo();
  const [cashReceipts, setCashReceipts] = useState(true);
  const totalPrice = price * quantity;

  return (
    <Container>
      <Title>결제정보</Title>
      <Wrapper>
        <Checkbox
          size="lg"
          colorScheme="orange"
          fontWeight="bold"
          name="cash_receipts"
          value="check"
          checked={cashReceipts}
          onChange={() => setCashReceipts(!cashReceipts)}
        >
          현금영수증 신청
        </Checkbox>
        <Select name="select" disabled={cashReceipts}>
          <option value="개인">개인소득공제</option>
          <option value="사업자">사업자증빙용</option>
        </Select>
        <Input
          type="text"
          name="phone"
          placeholder="(-없이) 숫자만 입력해주세요."
          disabled={cashReceipts}
        />
      </Wrapper>
      <TotalPrice>
        <div>최종 결제 금액</div>
        {totalPrice}원
      </TotalPrice>
      <Button>{totalPrice}원 결제하기</Button>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  border-left: 1px solid rgb(237, 237, 237);
  padding: 20px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
  border-top: 1px solid rgb(237, 237, 237);
  border-bottom: 1px solid rgb(237, 237, 237);
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  border-bottom: 1px solid rgb(237, 237, 237);
  padding: 20px;
  margin-bottom: 20px;
`;
