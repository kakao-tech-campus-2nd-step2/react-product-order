import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../common/Button';
import { Loading } from '../common/Handle';
import { HandleBox } from '../common/Handle';
import { CountOption } from './CountOption';

import { useAuth } from '@/hooks/useAuth';
import { useOrderHistory } from '@/hooks/useOrderHistory';
import { useProductOption } from '@/services/useProductOption';

export const OptionSection = ({ productId }: { productId: string }) => {
  const [count, setCount] = useState('1');
  const navigate = useNavigate();
  const sessionStorage = window.sessionStorage;
  const { authToken } = useAuth();
  const { setOrderHistoryToken } = useOrderHistory();
  const { error, isPending, isError, data } = useProductOption(productId);

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <HandleBox>{error.message}</HandleBox>;
  }
  console.log(data);
  const totalPrice = data.options.productPrice * Number(count);
  const handleClick = () => {
    if (!authToken) {
      if (!window.confirm('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?')) return null;
      return navigate('/login');
    }
    sessionStorage.setItem('orderHistory', JSON.stringify({ id: parseInt(productId), count: parseInt(count) }));
    setOrderHistoryToken({ id: parseInt(productId), count: parseInt(count) });
    navigate('/order');
  };

  return (
    <OptionSectionWrapper>
      <CountOption
        count={count}
        name={data.options.productName}
        setCount={setCount}
        limit={data.options.giftOrderLimit}
      />
      <ResultWrapper>
        <FinallyPrice>
          총 결제 금액<span>{totalPrice}원</span>
        </FinallyPrice>
        <Button themetype="black" onClick={handleClick}>
          나에게 선물하기
        </Button>
      </ResultWrapper>
    </OptionSectionWrapper>
  );
};
const OptionSectionWrapper = styled.div`
  width: 100%;
  padding: 30px 12px 30px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ResultWrapper = styled.div`
  padding: 12px 0 0;
`;
const FinallyPrice = styled.div`
  margin-bottom: 20px;
  padding: 18px 20px;
  border-radius: 4px;
  background-color: #f5f5f5;
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
