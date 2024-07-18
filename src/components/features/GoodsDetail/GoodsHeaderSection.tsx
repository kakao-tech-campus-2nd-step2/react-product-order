import styled from '@emotion/styled';

import { Image } from '@/components/common/Image';
import { Container } from '@/components/common/layouts/Container';
import { PaymentInfo } from '@/components/features/GoodsDetail/PaymentInfo';
import { breakpoints } from '@/styles/variants';

import NumberInputWithButtons from './NumberInputWithButtons';

export const GoodsHeaderSection = () => {
  const product = {
    image:
      'https://st.kakaocdn.net/product/gift/product/20231113112031_0bbb5618d41a4b758340af1df0ff4183.jpg',
    label: '"말랑 쫀득 꿀잠 선물" 허그 오리 모찌 인형 /애착 쿠션 35cm',
    price: 9900,
  };

  return (
    <Wrapper>
      <StyledDiv>
        <GoodsThumnailImage src={product.image} alt={product.label} />
        <SimpleInfoWrapper>
          <GoodsTitle>{product.label}</GoodsTitle>
          <GoodsPrice>{`${product.price}원`}</GoodsPrice>
          <GiftDescription>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</GiftDescription>
        </SimpleInfoWrapper>
        <PaymentInfoWrapper>
          <NumberInputWithButtons label={product.label} />
          <PaymentInfo />
        </PaymentInfoWrapper>
      </StyledDiv>
    </Wrapper>
  );
};

const Wrapper = styled(Container)`
  margin: 0 auto;
  padding: 14px 14px 3px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 45px 52px 23px;
  }
`;

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
