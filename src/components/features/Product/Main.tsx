import styled from '@emotion/styled';

import { Image } from '@/components/common/Image';
import { breakpoints } from '@/styles/variants';

type Props = {
  name: string;
  imageURL: string;
  price: number;
};

export const Main = ({ name, imageURL, price }: Props) => {
  return (
    <Wrapper>
      <Article>
        <Header>
          <Image
            src={imageURL}
            alt={name}
            width="100%"
            maxWidth="450px"
            radius={0}
            ratio="square"
          />
          <TitleContainer>
            <Title>{name}</Title>
            <Price>{price}원</Price>
            <Hr />
            <Description>카톡 친구가 아니어도 선물 코드로 선물할 수 있어요!</Description>
            <Hr />
          </TitleContainer>
        </Header>
      </Article>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(100vh - 54px);
`;

const Article = styled.article`
  width: 100%;
  padding: 16px 16px 60px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 32px 32px 80px;
  }
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const TitleContainer = styled.div`
  width: 100%;

  @media screen and (min-width: 768px) {
    padding-left: 24px;
  }
`;

const Title = styled.h2`
  padding-top: 24px;
  font-size: 24px;
  line-height: 33px;
  color: rgb(17, 17, 17);
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
  color: rgb(34, 34, 34);
`;

const Hr = styled.hr`
  opacity: 0.6;
  border-width: 0px 0px 1px;
  border-image: initial;
  border-color: inherit;
  border-style: solid;
  width: 100%;
  color: rgb(245, 245, 245);
`;

const Description = styled.p`
  padding: 24px 12px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(17, 17, 17);
`;
