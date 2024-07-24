import { useParams } from 'react-router-dom';

import { useProductDetail } from '@/api/hooks/useProductDetail';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import { Aside } from '@/components/features/Product/Aside';
import { Main } from '@/components/features/Product/Main';
import { ErrorMessageContainer } from '@/styles';

export const Product = () => {
  const { productKey } = useParams<{ productKey: string }>();
  const productKeyNumber = productKey ? parseInt(productKey, 10) : 0;

  const { data, isLoading, isError } = useProductDetail(productKeyNumber);

  const productDetail = data?.detail;

  if (isLoading) return <ErrorMessageContainer>Loading...</ErrorMessageContainer>;
  if (isError) return <ErrorMessageContainer>에러가 발생했습니다.</ErrorMessageContainer>;
  if (!productDetail) return <ErrorMessageContainer>찾는 상품이 없습니다.</ErrorMessageContainer>;

  return (
    <SplitLayout
      mainChildren={
        <Main
          name={productDetail.name}
          imageURL={productDetail.imageURL}
          price={productDetail.price.sellingPrice}
        />
      }
      asideChildren={
        <Aside
          productId={productKeyNumber}
          name={productDetail.name}
          price={productDetail.price.sellingPrice}
        />
      }
    />
  );
};
