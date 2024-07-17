import { Navigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import { MainProduct } from '@/components/features/ProductDetail/MainProduct';
import { ProductOption } from '@/components/features/ProductDetail/ProductOption';

import { useCurrentProduct } from '@/hooks/useCurrentProduct';
import { RouterPath } from '@/routes/path';

export const ProductDetailPage = () => {
    const { productId = '' } = useParams<{ productId: string }>();
    const { isRender, currentProduct } = useCurrentProduct({ productId });

    if (!isRender) return null;

    if (!currentProduct) {
        return <Navigate to={RouterPath.notFound} />;
    }

    return (
        <>
            <Wrapper>
                <MainProduct productId={productId} />
                <ProductOption />
            </Wrapper>
        </>
    );
};


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 1280px;
`;