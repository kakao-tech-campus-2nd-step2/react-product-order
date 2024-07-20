import { Spinner } from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router-dom';

import { useFetchProductHistory } from '@/api/hooks/useFetchProductHistory';
import OrderDetailsForm from '@/components/features/Order/OrderDetailsForm';

export const OrderDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();

  if (!productId) {
    return <div>상품 ID가 유효하지 않습니다.</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: productDetail, isLoading, isError } = useFetchProductHistory(productId);
  const quantity = location.state?.quantity || 1;

  if (isLoading) return <Spinner />;
  if (isError || !productDetail) return <div>에러 페이지</div>;

  return <OrderDetailsForm productDetail={productDetail} quantity={quantity} />;
};

export default OrderDetailsPage;
