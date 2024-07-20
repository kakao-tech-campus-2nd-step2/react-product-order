import { Divider } from '@chakra-ui/layout';
import styled from '@emotion/styled';

import { Button } from '../common/Button';
import { HandleBox, Loading } from '../common/Handle';
import { CashReceipt } from './CashReceipt';

import { useProductDetail } from '@/services/useProductDetail';

export const PaymentSection = ({ orderHistory }: { orderHistory: { id: number; count: number } }) => {
  const { isError, isPending, data, error } = useProductDetail(orderHistory.id.toString());

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <HandleBox>{error.message}</HandleBox>;
  }
  const totalPrice = data.detail.price.basicPrice * orderHistory.count;
  const handleClick = () => {
    window.alert('주문이 완료되었습니다.');
  };

  return (
    <PaymentSectionWrapper>
      <Title>결제 정보</Title>
      <Divider color="#e6e6e6" />
      <CashReceipt />
      <PaymentInfo>
        <Divider color="#e6e6e6" />
        <FinallyPrice>
          최종 결제금액<span>{totalPrice}원</span>
        </FinallyPrice>
        <Divider color="#e6e6e6" marginBottom={10} />
        <Button themetype="kakao" onClick={handleClick}>
          {totalPrice}원 결제하기
        </Button>
      </PaymentInfo>
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
