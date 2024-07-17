import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useBuyInfo } from '@/provider/BuyInfo';

type Props = {
  name: string;
  price: number;
};
export const ProductDescript = ({ name, price }: Props) => {
  const { setPrice } = useBuyInfo();
  useEffect(() => {
    setPrice(price);
  }, [setPrice, price]);
  return (
    <Wrapper>
      <Title>{name}</Title>
      <Price>{price}원</Price>
      <Descript>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Descript>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 15px;
`;
const Title = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
`;
const Price = styled.div`
  font-size: 30px;
  margin-bottom: 30px;
`;
const Descript = styled.div`
  font-weight: bold;
  font-size: 14px;
  padding: 20px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
`;
