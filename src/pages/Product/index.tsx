import { Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useFetchProductHistory } from '@/api/hooks/useFetchProductHistory';
import ProductDetailForm from '@/components/features/Product/ProductDetailsForm';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();

  if (!productId) {
    return <div>상품 ID가 유효하지 않습니다.</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: productDetail, isLoading, isError } = useFetchProductHistory(productId);

  if (isLoading) return <Spinner />;
  if (isError || !productDetail) return <div>에러 페이지</div>;

  return <ProductDetailForm productDetail={productDetail} productId={productId} />;
};

export default ProductDetailsPage;
