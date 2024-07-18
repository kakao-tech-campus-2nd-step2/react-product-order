import styled from '@emotion/styled';

import { ProductOptionsSection } from '@/components/features/ProductDetail/ProductOptionsSection';
import { ProductOverviewSection } from '@/components/features/ProductDetail/ProductOverViewSection';
import { breakpoints } from '@/styles/variants';
import { GoodsMockData } from '@/types/mock';

export const ProductDetailPage = () => {
  return (
    <Wrapper>
      <ProductOverviewSection product={GoodsMockData} />
      <ProductOptionsSection product={GoodsMockData} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 16px;
  max-width: ${breakpoints.lg};
  min-height: 100vh;
  margin: 0 auto;

  @media screen and (min-width: ${breakpoints.md}) {
    flex-direction: row;
    padding: 16px 80px;
  }
`;
