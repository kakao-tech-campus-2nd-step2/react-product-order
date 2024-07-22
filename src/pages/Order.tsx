import styled from '@emotion/styled';

import { useProductDetail } from '@/api/hooks/useProductDetail';
import { Container } from '@/components/common/layouts/Container';
import { Aside } from '@/components/features/Order/Aside';
import { Main } from '@/components/features/Order/Main';
import { ErrorMessageContainer } from '@/styles';

export const Order = () => {
  const orderHistoryString = sessionStorage.getItem('orderHistory');
  const orderHistory = orderHistoryString ? JSON.parse(orderHistoryString) : {};
  const productId = orderHistory.id || 0;
  const quantity = orderHistory.quantity || 1;

  const { data, isLoading, isError } = useProductDetail(productId);

  const productDetail = data?.detail;

  if (isLoading) return <ErrorMessageContainer>Loading...</ErrorMessageContainer>;
  if (isError) return <ErrorMessageContainer>에러가 발생했습니다.</ErrorMessageContainer>;
  if (!productDetail) return <ErrorMessageContainer>찾는 상품이 없습니다.</ErrorMessageContainer>;

  return (
    <StyledProduct>
      <Container maxWidth="100%" flexDirection="row" alignItems="center">
        <form>
          <div>
            <div>
              <ProductContainer>
                <Main
                  name={productDetail.name}
                  imageURL={productDetail.imageURL}
                  brandName={productDetail.brandInfo.name}
                  quantity={quantity}
                />
                <Aside totalAmount={productDetail.price.sellingPrice * quantity} />
              </ProductContainer>
            </div>
          </div>
        </form>
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
