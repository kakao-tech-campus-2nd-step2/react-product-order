import styled from '@emotion/styled';

import type { GoodsDetailRequestParams } from '@/api/hooks/useGetProductsDetail';
import { useGetGoodsDetail } from '@/api/hooks/useGetProductsDetail';
import { Image } from '@/components/common/Image';
import { PaymentInfo } from '@/components/features/GoodsDetail/PaymentInfo';
import { breakpoints } from '@/styles/variants';

import NumberInputWithButtons from './NumberInputWithButtons';

type Props = GoodsDetailRequestParams;

export const GoodsHeaderSection = ({ productId }: Props) => {
  const { isLoading, error, data } = useGetGoodsDetail({ productId });

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (error || !data) {
    return <div>에러</div>;
  }
  console.log(data);

  return (
    <StyledDiv>
      <GoodsThumnailImage src={data.imageURL} alt={data.name} />
      <SimpleInfoWrapper>
        <GoodsTitle>{data.name}</GoodsTitle>
        <GoodsPrice>{`${data.price.basicPrice}원`}</GoodsPrice>
        <GiftDescription>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</GiftDescription>
      </SimpleInfoWrapper>
      <PaymentInfoWrapper>
        <NumberInputWithButtons label={data.name} />
        <PaymentInfo />
      </PaymentInfoWrapper>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;

  @media screen and (min-width: ${breakpoints.sm}) {
    flex-direction: row;
  }

  @media screen and (max-width: ${breakpoints.sm}) {
    flex-direction: column;
  }
`;

const GoodsThumnailImage = styled(Image)`
  width: 100%;
  height: 100%;

  @media screen and (min-width: ${breakpoints.sm}) {
    max-width: 450px;
    max-height: 450px;
  }
`;

const SimpleInfoWrapper = styled.div`
  flex: 1;
  width: 100%;
  @media screen and (min-width: ${breakpoints.sm}) {
    padding-left: 24px;
  }
`;

const GoodsTitle = styled.h2`
  padding-top: 24px;
  font-size: 24px;
  line-height: 33px;
  color: rgb(17, 17, 17);
  font-weight: 400;
  word-break: break-all;
`;

const GoodsPrice = styled.p`
  width: 100%;
  min-height: 120px;
  padding-top: 16px;
  font-size: 30px;
  font-weight: 400;
  line-height: 52px;
  color: rgb(34, 34, 34);
`;

const GiftDescription = styled.p`
  padding: 24px 12px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(17, 17, 17);
  border-top: 1px solid rgb(230, 230, 230);
  border-bottom: 1px solid rgb(230, 230, 230);
`;

const PaymentInfoWrapper = styled.div`
  padding: 30px 12px 30px 30px;
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;
