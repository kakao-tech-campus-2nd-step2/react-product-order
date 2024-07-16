import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import { useGetProduct } from '@/api/hooks/useGetProduct';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';

export const ProductDetail = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const { data } = useGetProduct(productId);
  console.log('current', data);
  if (!data) return null;
  const product = data?.detail;

  return (
    <Wrapper>
      <Container>
        <div>
          <img src={product.imageURL} alt={product.name} />
          <h1>{product.name}</h1>
          <p>{product.price.basicPrice}</p>
        </div>
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
