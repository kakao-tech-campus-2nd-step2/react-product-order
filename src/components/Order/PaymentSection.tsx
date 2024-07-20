import { Divider } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import { useFormContext } from 'react-hook-form';

import { Button } from '../common/Button';
import { HandleBox, Loading } from '../common/Handle';
import { CashReceipt } from './CashReceipt';

import type { FormValues } from '@/pages/OrderPage';
import { useProductDetail } from '@/services/useProductDetail';

export const PaymentSection = ({ orderHistory }: { orderHistory: { id: number; count: number } }) => {
  const { isError, isPending, data, error } = useProductDetail(orderHistory.id.toString());
  const { handleSubmit } = useFormContext<FormValues>();

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <HandleBox>{error.message}</HandleBox>;
  }

  const onSubmit = (value: FormValues) => {
    if (value.message && value.message.length > 100) {
      alert('메시지는 100자 이내로 입력해주세요.');
      return;
    }
    if (!value.message) {
      alert('메시지를 입력해주세요.');
      return;
    }
    if (value.cashReceipt && !value.number) {
      alert('현금영수증 번호를 입력해주세요');
      return;
    }
    if (isNaN(Number(value.number))) {
      alert('현금영수증 번호는 숫자로만 입력해주세요.');
      return;
    }
    alert('주문이 완료되었습니다.');
  };

  const totalPrice = data.detail.price.basicPrice * orderHistory.count;

  return (
    <PaymentSectionWrapper>
      <Title>결제 정보</Title>
      <Divider color="#e6e6e6" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CashReceipt />
        <PaymentInfo>
          <Divider color="#e6e6e6" />
          <FinallyPrice>
            최종 결제금액<span>{totalPrice}원</span>
          </FinallyPrice>
          <Divider color="#e6e6e6" marginBottom={10} />
          <Button themetype="kakao" type="submit">
            {totalPrice}원 결제하기
          </Button>
        </PaymentInfo>
      </form>
    </PaymentSectionWrapper>
  );
};
const PaymentSectionWrapper = styled.div`
  width: 100%;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
  color: #111;
  padding: 20px 0px;
`;
const PaymentInfo = styled.div`
  padding: 12px 0 0;
`;
const FinallyPrice = styled.div`
  padding: 18px;
  display: flex;
  justify-content: space-between;

  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: #111;

  & span {
    font-size: 20px;
    letter-spacing: -0.02em;
  }
`;
