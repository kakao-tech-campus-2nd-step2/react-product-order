import { Grid, Spinner } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useGetThemesProducts } from '@/api/hooks/useGetThemesProducts';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { VisibilityLoader } from '@/components/common/VisibilityLoader';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { data, isError, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetThemesProducts({ themeKey });

  if (isLoading)
    return (
      <TextView>
        <Spinner />
      </TextView>
    );
  if (isError) return <TextView>에러가 발생했습니다.</TextView>;
  if (!data) return <></>;
  if (data.pages[0].products.length <= 0) return <TextView>상품이 없어요.</TextView>;

  const flattenGoodsList = data.pages.map((page) => page?.products ?? []).flat();

  return (
    <Wrapper>
      <Container>
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          {flattenGoodsList.map(({ id, imageURL, name, price, brandInfo }) => (
            <Link to={getDynamicPath.productDetail(String(id))} key={id}>
              <DefaultGoodsItems
                imageSrc={imageURL}
                title={name}
                amount={price.sellingPrice}
                subtitle={brandInfo.name}
              />
            </Link>
          ))}
        </Grid>
        {hasNextPage && (
          <VisibilityLoader
            callback={() => {
              if (!isFetchingNextPage) {
                fetchNextPage();
              }
            }}
          />
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
