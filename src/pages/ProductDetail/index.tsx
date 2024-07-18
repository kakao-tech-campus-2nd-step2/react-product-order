import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import { ProductOptionsSection } from '@/components/features/ProductDetail/ProductOptionsSection';
import { ProductOverviewSection } from '@/components/features/ProductDetail/ProductOverViewSection';
import { useCurrentProduct } from '@/hooks/useCurrentProduct';
import { breakpoints } from '@/styles/variants';

export const ProductDetailPage = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const { isRender, currentProduct } = useCurrentProduct({ productId });

  if (!isRender) return null;

  if (!currentProduct) {
    return null;
  }

  return (
    <Wrapper>
      <ProductOverviewSection product={currentProduct} />
      <ProductOptionsSection product={currentProduct} />
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
