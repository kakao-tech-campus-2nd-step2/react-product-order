import styled from '@emotion/styled';

import { useGetGoodsDetail } from '@/api/hooks/useGetGoodsDetail';
import { Image } from '@/components/common/Image';
import { Spacing } from '@/components/common/layouts/Spacing';
import type { OrderHistory } from '@/types';

import { LabelText } from '../Common/LabelText';

type Props = {
  orderHistory: OrderHistory;
};
export const GoodsInfo = ({ orderHistory }: Props) => {
  const { id, count } = orderHistory;
  const {
    data: { detail },
  } = useGetGoodsDetail({ productId: id.toString() });

  return (
    <Wrapper>
      <LabelText>선물내역</LabelText>
      <Spacing />
      <GoodsWrapper>
        <GoodsInfoWrapper>
          <GoodsInfoImage>
            <Image src={detail.imageURL} width={86} ratio="square" />
          </GoodsInfoImage>
          <GoodsInfoTextWrapper>
            <GoodsInfoTextLabel>{detail.brandInfo.name}</GoodsInfoTextLabel>
            <GoodsInfoTextTitle>
              {detail.name} X {count}개
            </GoodsInfoTextTitle>
          </GoodsInfoTextWrapper>
        </GoodsInfoWrapper>
      </GoodsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 16px;
`;

const GoodsWrapper = styled.div`
  width: 100%;
  padding: 20px 16px 16px;
  border-radius: 8px;
  border: 1px solid #ededed;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
`;

const GoodsInfoWrapper = styled.div`
  display: flex;
`;

const GoodsInfoImage = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
`;

const GoodsInfoTextWrapper = styled.div`
  padding-left: 8px;
`;

const GoodsInfoTextLabel = styled.p`
  font-size: 13px;
  line-height: 14px;
  color: #888;
  font-weight: 400;
`;

const GoodsInfoTextTitle = styled.p`
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  margin-top: 3px;
  color: #222;
  overflow: hidden;
  font-weight: 400;
`;
