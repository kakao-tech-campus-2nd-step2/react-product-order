import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import { useAuth } from '@/provider/Auth';
import { useBuyInfo } from '@/provider/BuyInfo';
import { getDynamicPath, RouterPath } from '@/routes/path';

export const TotalPrice = () => {
  const { productKey } = useParams();
  const { price, quantity } = useBuyInfo();
  const totalPrice = price * quantity;
  const auth = useAuth();
  const navigate = useNavigate();

  const handleFormeClick = () => {
    if (!auth) {
      const redirect = confirm('로그인이 필요한 메뉴입니다. 로그인 페이지로 이동하시겠습니까?');
      if (redirect)
        navigate(getDynamicPath.login(productKey && getDynamicPath.detail(+productKey)));
      return;
    }
    navigate(RouterPath.order, { state: productKey });
  };
  return (
    <div>
      <Banner>
        <div>총 결제 금액</div>
        <Price>{totalPrice}원</Price>
      </Banner>
      <Button theme="darkGray" onClick={handleFormeClick}>
        나에게 선물하기
      </Button>
    </div>
  );
};
const Banner = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const Price = styled.div`
  font-size: 20px;
`;
