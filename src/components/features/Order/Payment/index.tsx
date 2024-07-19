import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@components/common';
import ReceiptForm from './ReceiptForm';

interface PaymentProps {
  message: string;
  hasCashRecipt: boolean;
  cashReciptType: string;
  cashReciptNumber: string;
  onInputChange: (name: string, value: any) => void;
}

export default function Payment({
  message,
  hasCashRecipt,
  cashReciptType,
  cashReciptNumber,
  onInputChange,
}: PaymentProps) {
  const handleClick = () => {
    if (!message) alert('메시지를 입력해주세요.');
    if (hasCashRecipt && !cashReciptNumber) alert('현금영수증 번호를 입력해주세요.');
    console.info(message, hasCashRecipt, cashReciptType, cashReciptNumber);
  };

  return (
    <PaymentContainer>
      <Title>결제정보</Title>
      <ReceiptForm
        hasCashRecipt={hasCashRecipt}
        cashReciptType={cashReciptType}
        cashReciptNumber={cashReciptNumber}
        onInputChange={onInputChange}
      />
      <TotalAmount>
        <dl>
          <dt>최종 결제금액</dt>
          <dd>49900원</dd>
        </dl>
      </TotalAmount>
      <Button theme="kakao" onClick={handleClick}>
        49900원 결제하기
      </Button>
    </PaymentContainer>
  );
}

const PaymentContainer = styled.aside`
  width: 360px;
`;

const Title = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const TotalAmount = styled.div`
  padding: 18px 20px;
  border-radius: 4px;
  background-color: rgb(245, 245, 245);
  margin-bottom: 20px;

  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
  }

  dt {
    font-size: 14px;
  }

  dd {
    font-size: 20px;
  }
`;
