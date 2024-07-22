import styled from '@emotion/styled';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useMessage } from '@/context/message/MessageContext';
import { Text } from '@/styles';

type Props = { totalAmount: number };

export const Aside = ({ totalAmount }: Props) => {
  const { message } = useMessage();

  const handleOrderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!message.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    }
    // 결제 처리
    alert('주문이 완료되었습니다.');
  };

  return (
    <Wrapper>
      <PaymentInfo>
        <TitleContainer>
          <Text fontSize="18px" lineHeight="21px" fontWeight="700">
            결제 정보
          </Text>
        </TitleContainer>
        <Hr />
        <CashReceipt>
          <Label>
            <input type="checkbox" />
            <span>현금영수증 신청</span>
          </Label>
          <Spacing height={8} />
          <Select name="cashReceiptType" id="cashReceiptType">
            <option value="PERSONAL">개인소득공제</option>
            <option value="BUSINESS">사업자증빙용</option>
          </Select>
          <NumberInput name="cashReceiptNumber" placeholder="(-없이) 숫자만 입력해주세요." />
        </CashReceipt>
        <Hr />
        <TotalAmount>
          <Text fontSize="15px" lineHeight="25px" fontWeight="700">
            최종 결제금액
          </Text>
          <Text fontSize="18px" lineHeight="21px" fontWeight="700">
            {totalAmount}원
          </Text>
        </TotalAmount>
        <Hr />
        <Spacing height={32} />
        <Button theme="kakao" onClick={handleOrderClick}>
          {totalAmount}원 결제하기
        </Button>
      </PaymentInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(100vh - 54px);
`;

const PaymentInfo = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid rgb(237, 237, 237);
  border-right: 1px solid rgb(237, 237, 237);
  padding: 16px;
`;

const TitleContainer = styled.h6`
  padding: 24px 0px 20px;
`;

const Hr = styled.hr`
  opacity: 0.6;
  border-width: 0px 0px 1px;
  border-image: initial;
  border-color: inherit;
  border-style: solid;
  width: 100%;
  color: rgb(237, 237, 237);
`;

const CashReceipt = styled.div`
  width: 100%;
  padding: 16px;
`;

const Label = styled.label`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  vertical-align: top;
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  min-width: 0px;
  outline: transparent solid 2px;
  outline-offset: 2px;
  position: relative;
  appearance: none;
  padding-bottom: 1px;
  background: inherit;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: inherit;
`;

const NumberInput = styled.input`
  width: 100%;
  min-width: 0px;
  outline: transparent solid 2px;
  outline-offset: 2px;
  position: relative;
  appearance: none;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: inherit;
  background: inherit;
`;

const TotalAmount = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
