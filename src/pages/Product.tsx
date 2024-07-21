import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import { useProductDetail } from '@/api/hooks/useProductDetail';
import { Container } from '@/components/common/layouts/Container';
import { Aside } from '@/components/features/Product/Aside';
import { Main } from '@/components/features/Product/Main';
import { ErrorMessageContainer } from '@/styles';

export const Product = () => {
  const { productKey } = useParams<{ productKey: string }>();
  const productKeyNumber = productKey ? parseInt(productKey, 10) : undefined;

  const { data, isLoading, isError } = useProductDetail(productKeyNumber || 0);

  const productDetail = data?.detail;

  if (isLoading) return <ErrorMessageContainer>Loading...</ErrorMessageContainer>;
  if (isError) return <ErrorMessageContainer>에러가 발생했습니다.</ErrorMessageContainer>;
  if (!productDetail) return <ErrorMessageContainer>찾는 상품이 없습니다.</ErrorMessageContainer>;

  return (
    <StyledProduct>
      <Container maxWidth="100%" flexDirection="row" alignItems="center">
        <ProductContainer>
          <Main
            name={productDetail.name}
            imageURL={productDetail.imageURL}
            price={productDetail.price.sellingPrice}
          />
          <Aside name={productDetail.name} price={productDetail.price.sellingPrice} />
        </ProductContainer>
      </Container>
    </StyledProduct>
  );
};

const StyledProduct = styled.div`
  width: 100%;
`;

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
`;
