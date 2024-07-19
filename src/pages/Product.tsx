import styled from '@emotion/styled';

import { Container } from '@/components/common/layouts/Container';
import { Aside } from '@/components/features/Product/Aside';
import { Main } from '@/components/features/Product/Main';

export const Product = () => {
  return (
    <StyledProduct>
      <Container>
        <ProductContainer>
          <Main />
          <Aside />
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
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`;
