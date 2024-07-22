import styled from '@emotion/styled';

import { Container } from '@/components/common/layouts/Container';
import { Main } from '@/components/features/Order/Main';
import { Aside } from '@/components/features/Order/Aside';

export const Order = () => {
  return (
    <StyledProduct>
      <Container maxWidth="100%" flexDirection="row" alignItems="center">
        <form>
          <div>
            <div>
              <ProductContainer>
                <Main
                  name="[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)"
                  imageURL="https://st.kakaocdn.net/product/gift/product/20240703140657_19263fd5455146b0a308a4e0d6bacc6a.png"
                  brandName="산타마리아노벨라"
                  quantity={2}
                />
                <Aside />
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
