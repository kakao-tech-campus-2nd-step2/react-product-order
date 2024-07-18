import { Navigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import { MainOption } from '@/components/features/ProductOption/MainOption';
import { PaymentOption } from '@/components/features/ProductOption/PaymentOption';

import { useCurrentProductOption } from '@/hooks/useCurrentProductOption';

// import { useCurrentTheme } from '@/hooks/useCurrentTheme';
import { RouterPath } from '@/routes/path';

export const ProductOptionPage = () => {
    const { productId = '' } = useParams<{ productId: string }>();
    const { isRender, currentProduct } = useCurrentProductOption({ productId });

    if (!isRender) return null;

    if (!currentProduct) {
        return <Navigate to={RouterPath.notFound} />;
    }

    return (
        <>
            <Wrapper>
                <InsideWrapper>
                    <MainOption />
                    <PaymentOption />
                </InsideWrapper>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const InsideWrapper = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`