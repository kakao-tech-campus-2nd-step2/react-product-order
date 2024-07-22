import styled from '@emotion/styled';
import { Navigate, useParams } from 'react-router-dom';

import { Loading } from '@/components/common/Handle';
import { Container } from '@/components/common/Layout/Container';
import { DetailSection } from '@/components/ProductDetail/DetailSection';
import { OptionSection } from '@/components/ProductDetail/OptionSection';
import { useProductDetail } from '@/services/useProductDetail';

export default function ProductDetailPage() {
  const { productId = '' } = useParams<{ productId: string }>();
  const { isPending, isError, error, data } = useProductDetail(productId);

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    console.error(error);
    return <Navigate to="/" />;
  }

  return (
    <ProductDetailPageWrapper>
      <Container maxWidth="1280px">
        <Inner>
          <Left>
            <DetailSection data={data} />
          </Left>
          <Right>
            <OptionSection productId={productId} />
          </Right>
        </Inner>
      </Container>
    </ProductDetailPageWrapper>
  );
}
const ProductDetailPageWrapper = styled.div`
  width: 100%;
`;
const Inner = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`;
const Left = styled.div`
  width: 100%;
  max-width: 900px;
`;
const Right = styled.div`
  display: none;
  position: sticky;
  top: 54px;
  width: 100%;
  max-width: 360px;
  height: calc(100vh - 54px);

  @media screen and (min-width: 768px) {
    display: block;
  }
`;
