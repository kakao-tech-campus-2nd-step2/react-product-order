import { Navigate, useParams, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import { MainOption } from '@/components/features/ProductOption/MainOption';

import { useCurrentProductOption } from '@/hooks/useCurrentProductOption';

import { RouterPath } from '@/routes/path';

export const ProductOptionPage = () => {
    const { productId = '' } = useParams<{ productId: string }>();
    const { isRender, currentProduct } = useCurrentProductOption({ productId });

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    if (!isRender) return null;

    if (!currentProduct) {
        return <Navigate to={RouterPath.notFound} />;
    }
    const count = searchParams.get('count');
    const price = searchParams.get('price');

    console.log(count, price);

    return (
        <>
            <Wrapper>
                <InsideWrapper>
                    <MainOption productId={productId} productCount={count} allPrice={price} />
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