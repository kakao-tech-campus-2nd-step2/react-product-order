import styled from '@emotion/styled';

import { Button } from '@/components/common/Button';

export const TotalPrice = () => {
  return (
    <div>
      <Banner>
        <div>총 결제 금액</div>
        <Price>145000원</Price>
      </Banner>
      <Button theme="darkGray">나에게 선물하기</Button>
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
