import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useGetGoodsDetail } from '@/api/hooks/useGetProductsDetail';
import { Spinner } from '@/components/common/Spinner';
import { GiftMessage } from '@/components/features/Order/GiftMessage';
import { GiftSummary } from '@/components/features/Order/GiftSummary';
import { Order } from '@/components/features/Order/index';

export const OrderPage = () => {
  const location = useLocation();
  const { productId, count } = location.state || {};
  const { data, isLoading } = useGetGoodsDetail({ productId: productId });
  const [loading, setLoading] = useState(true);

  const [cardMessage, setCardMessage] = useState<string>('');

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  if (loading) {
    return (
      <TextView>
        <Spinner />
      </TextView>
    );
  }

  return (
    <Wrapper>
      <GiftWrapper>
        <GiftMessage cardMessage={cardMessage} setCardMessage={setCardMessage} />
        <Hr />
        {data && (
          <GiftSummary imageURL={data.imageURL} brandName={data.brandInfo.name} name={data.name} />
        )}
      </GiftWrapper>
      {data && <Order price={data.price.basicPrice * count} cardMessage={cardMessage} />}
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

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
