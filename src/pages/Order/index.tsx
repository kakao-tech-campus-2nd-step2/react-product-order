import styled from '@emotion/styled';

import { useGetGoodsDetail } from '@/api/hooks/useGetProductsDetail';
import { GiftMessage } from '@/components/features/Order/GiftMessage';
import { GiftSummary } from '@/components/features/Order/GiftSummary';
import { OrderInfo } from '@/components/features/Order/OrderInfo';

export const OrderPage = () => {
  const { data } = useGetGoodsDetail({ productId: '8026405'.toString() });

  return (
    <Wrapper>
      <GiftWrapper>
        <GiftMessage />
        <Hr />
        {data && (
          <GiftSummary imageURL={data.imageURL} brandName={data.brandInfo.name} name={data.name} />
        )}
      </GiftWrapper>
      {data && <OrderInfo price={data.price.basicPrice} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 24px;
  width: 1280px;
  height: 720px;
  margin: 0 auto;
  border-left: 1px solid rgb(237, 237, 237);
`;

const GiftWrapper = styled.div`
  width: 100%;
  padding: 44px 0px 32px;
  max-width: 900px;
`;

const Hr = styled.div`
  width: 100%;
  background-color: rgb(237, 237, 237);
  height: 8px;
`;
