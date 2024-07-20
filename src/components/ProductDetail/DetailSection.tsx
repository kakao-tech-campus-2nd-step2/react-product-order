import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { Image } from '../common/Image';

import type { ProductDetailResponse } from '@/services/types';

export const DetailSection = ({ data }: { data: ProductDetailResponse }) => {
  return (
    <DetailSectionWrapper>
      <CustomImage radius={0} ratio={'square'} src={data.detail.imageURL} alt={data.detail.name} />
      <DetailWrapper>
        <Title>{data.detail.name}</Title>
        <Price>{data.detail.price.basicPrice}원</Price>
        <Divider color="#e6e6e6" />
        <Text>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Text>
        <Divider color="#e6e6e6" />
      </DetailWrapper>
    </DetailSectionWrapper>
  );
};
const DetailSectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding: 32px 32px 80px;
  }
`;
const CustomImage = styled(Image)`
  width: 100%;
  max-width: 450px;
`;
const DetailWrapper = styled.div`
  width: 100%;

  @media screen and (min-width: 768px) {
    padding-left: 20px;
  }
`;
const Title = styled.h2`
  padding-top: 24px;
  font-size: 24px;
  line-height: 33px;
  color: #111;
  font-weight: 400;
  word-break: break-all;
`;
const Price = styled.p`
  width: 100%;
  min-height: 120px;
  padding-top: 16px;
  font-size: 30px;
  font-weight: 400;
  line-height: 52px;
  color: #222;
`;
const Text = styled.p`
  padding: 24px 12px;
  font-size: 14px;
  font-weight: 700;
  line-height: 23px;
  color: #111;
`;
