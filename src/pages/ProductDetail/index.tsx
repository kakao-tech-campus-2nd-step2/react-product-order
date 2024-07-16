// import { Navigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import { MainProduct } from '@/components/features/ProductDetail/MainProduct';
import { ProductOption } from '@/components/features/ProductDetail/ProductOption';

// import { useCurrentTheme } from '@/hooks/useCurrentTheme';
// import { RouterPath } from '@/routes/path';

export const ProductDetailPage = () => {
    // const { themeKey = '' } = useParams<{ themeKey: string }>();
    // const { isRender, currentTheme } = useCurrentTheme({ themeKey });

    // if (!isRender) return null;

    // if (!currentTheme) {
    //     return <Navigate to={RouterPath.notFound} />;
    // }

    return (
        <>
            <Wrapper>
                <MainProduct />
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