import styled from '@emotion/styled';

import { Image } from '@/components/common/Image';

interface Props {
  imageURL: string;
  brandName: string;
  name: string;
}

export const GiftSummary = ({ imageURL, brandName, name }: Props) => {
  return (
    <div>
      <Wrapper>
        <GiftSummaryTitle>선물 내역</GiftSummaryTitle>
        <div style={{ padding: '5px' }} />
        <GiftSummaryWrapper>
          <Image src={imageURL} width={86} ratio="square" />
          <GiftInfo>
            <GiftBrandName>{brandName}</GiftBrandName>
            <GiftName>{name}</GiftName>
          </GiftInfo>
        </GiftSummaryWrapper>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 14px 30px;
`;

const GiftSummaryTitle = styled.span`
  font-size: 15px;
  line-height: 24px;
  font-weight: 700;
`;

const GiftSummaryWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 16px 16px;
  border-radius: 8px;
  border: 1px solid rgb(237, 237, 237);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 4px 8px;
`;

const GiftInfo = styled.div`
  width: 100%;
  padding-left: 10px;
`;

const GiftBrandName = styled.p`
  font-size: 13px;
  line-height: 14px;
  color: rgb(136, 136, 136);
  font-weight: 400;
`;

const GiftName = styled.p`
  font-size: 14px;
  line-height: 18px;
  margin-top: 3px;
  color: rgb(34, 34, 34);
  overflow: hidden;
  font-weight: 400;
`;
