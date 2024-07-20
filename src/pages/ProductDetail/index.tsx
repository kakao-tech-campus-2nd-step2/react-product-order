import styled from '@emotion/styled';
import { type FieldErrors, FormProvider } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';

import { ProductOptionsSection } from '@/components/features/ProductDetail/ProductOptionsSection';
import { ProductOverviewSection } from '@/components/features/ProductDetail/ProductOverViewSection';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useProductOptions } from '@/hooks/useProductOptions';
import { RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { type FormValues, useProductDetailForm } from './formSchema';

export const ProductDetailPage = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const { isRender: isDetailRender, currentProduct } = useProductDetail({ productId });
  const { isRender: isOptionsRender, productOptions } = useProductOptions({ productId });

  const formMethods = useProductDetailForm();

  if (!isDetailRender || !isOptionsRender) return null;

  if (!currentProduct) {
    return <Navigate to={RouterPath.home} />;
  }

  const handleError = (errors: FieldErrors<FormValues>) => {
    if (errors.quantity) {
      alert(errors.quantity.message);
    } else if (errors.selectedOption) {
      alert(errors.selectedOption.message);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(() => {}, handleError)}>
        <Wrapper>
          <ProductOverviewSection product={currentProduct} />
          <ProductOptionsSection
            product={currentProduct}
            productOptions={productOptions}
            formMethods={formMethods}
          />
        </Wrapper>
      </form>
    </FormProvider>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 16px;
  max-width: ${breakpoints.lg};
  min-height: 100vh;
  margin: 0 auto;

  @media screen and (min-width: ${breakpoints.md}) {
    flex-direction: row;
    padding: 16px 80px;
  }
`;
