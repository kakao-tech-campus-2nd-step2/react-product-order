import styled from '@emotion/styled';
import { Navigate, useParams } from 'react-router-dom';

import { ProductOptionsSection } from '@/components/features/ProductDetail/ProductOptionsSection';
import { ProductOverviewSection } from '@/components/features/ProductDetail/ProductOverViewSection';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useProductOptions } from '@/hooks/useProductOptions';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

export const ProductDetailPage = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const { isRender: isDetailRender, currentProduct } = useProductDetail({ productId });
  const { isRender: isOptionsRender, productOptions } = useProductOptions({ productId });

  if (!isDetailRender || !isOptionsRender) return null;

  if (!currentProduct) {
    return <Navigate to={RouterPath.home} />;
  }

  return (
    <Wrapper>
      <ProductOverviewSection product={currentProduct} />
      <ProductOptionsSection product={currentProduct} productOptions={productOptions} />
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
