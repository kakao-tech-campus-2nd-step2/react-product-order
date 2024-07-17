import styled from '@emotion/styled';

import { useGetProductsDetail } from '@/api/hooks/useGetProductDetail';
import { Spinner } from '@/components/common/Spinner';

type Props = {
  productId: string;
};

export const MainProduct = ({ productId }: Props) => {
  const { data, isError, isLoading } =
    useGetProductsDetail({
      productId,
    });



  if (isLoading)
    return (
      <TextView>
        <Spinner />
      </TextView>
    );
  if (isError)
    return <TextView>에러가 발생했습니다.</TextView>;
  if (!data) return <></>;

  return (
    <Wrapper>
      <InsideWrapper>
        <Header>
          <Image src="https://st.kakaocdn.net/product/gift/product/20240703140657_19263fd5455146b0a308a4e0d6bacc6a.png" alt="hh" />
          <Description>
            <Title>
              [단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)
            </Title>
            <Price>
              145000원
            </Price>
            <Banner>
              카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!
            </Banner>
          </Description>
        </Header>
      </InsideWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 100%;
  max-width: 900px;
`;

const InsideWrapper = styled.article`
  padding: 32px 32px 80px;
`

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Image = styled.img`
    max-width: 450px;
    width: 100%;
`;

const Description = styled.div`
  padding-left: 24px;
  width: 100%;
`

const Title = styled.h2`
  padding-top: 24px;
  font-size: 24px;
  line-height: 33px;
  color: rgb(17, 17, 17);
  font-weight: 400;
  word-break: break-all;
`

const Price = styled.p`
  width: 100%;
  min-height: 120px;
  padding-top: 16px;
  font-size: 30px;
  font-weight: 400;
  line-height: 52px;
  color: rgb(34, 34, 34);
`

const Banner = styled.p`
  padding: 24px 12px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(17, 17, 17);
  border-top: 1px solid var(--chakra-colors-chakra-border-color);
  border-bottom: 1px solid var(--chakra-colors-chakra-border-color);
`

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;

export const getCurrentProduct = (productData: any) => {
  console.log(productData);
  if (productData) {
    return true;
  } else {
    return false;
  }
};