import styled from '@emotion/styled';

import { HandleBox, Loading } from '../common/Handle';
import { Image } from '../common/Image';

import { useProductDetail } from '@/services/useProductDetail';

export const GiftHistory = ({ orderHistory }: { orderHistory: { id: number; count: number } }) => {
  const { isPending, isError, error, data } = useProductDetail(orderHistory.id.toString());
  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <HandleBox>{error.message}</HandleBox>;
  }
  return (
    <OptionSectionWrapper>
      <Title>선물내역</Title>
      <GoodsWrapper>
        <CustomImage radius={4} ratio={'square'} src={data.detail.imageURL} alt={data.detail.name} />
        <GoodsInfo>
          <Brand>{data.detail.brandInfo.name}</Brand>
          <Name>
            {data.detail.name}
            <span> X {orderHistory.count}개</span>
          </Name>
        </GoodsInfo>
      </GoodsWrapper>
    </OptionSectionWrapper>
  );
};
const OptionSectionWrapper = styled.div`
  width: 100%;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.h2`
  padding: 12px 0px;
  font-size: 16px;
  font-weight: 700;
  line-height: 23px;
  color: #111;
`;
const GoodsWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 18px;
  border: 1px solid #ededed;
  border-radius: 10px;
`;
const CustomImage = styled(Image)`
  width: 86px;
  margin-right: 10px;
`;
const GoodsInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const Brand = styled.p`
  font-size: 13px;
  line-height: 14px;
  color: #888;
  font-weight: 400;
`;
const Name = styled.p`
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  margin-top: 3px;
  color: #222;
  overflow: hidden;
  font-weight: 400;
`;
