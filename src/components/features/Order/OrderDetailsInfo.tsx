import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';

import CashReceiptFields from './CashReceiptFields';

type FormData = {
  hasCashReceipt: boolean;
  cashReceiptType: string;
  cashReceiptNumber: string;
};

type Props = {
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  totalAmount: number;
  error: string;
};

export const OrderDetailsInfo = ({ formData, onChange, totalAmount, error }: Props) => {
  return (
    <Wrapper>
      <Title>결제 정보</Title>
      <Divider color="#ededed" />
      <CashReceiptFields formData={formData} onChange={onChange} />
      <Divider color="#ededed" />
      <ItemWrapper>
        <LabelText>최종 결제금액</LabelText>
        <HeadingText>{totalAmount.toLocaleString()}원</HeadingText>
      </ItemWrapper>
      <Divider color="#ededed" />
      <Spacing height={32} />
      <Button type="submit">{totalAmount.toLocaleString()}원 결제하기</Button>
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
  padding: 16px;
`;

const Title = styled.h6`
  padding: 24px 0 20px;
  font-size: 2rem;
`;

const ItemWrapper = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeadingText = styled.span`
  font-size: 18px;
  line-height: 21px;
  color: #222;
  box-sizing: border-box;
  font-weight: 700;
`;

const LabelText = styled.span`
  font-size: 15px;
  line-height: 24px;
  font-weight: 700;
  color: #000;
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;

export default OrderDetailsInfo;
