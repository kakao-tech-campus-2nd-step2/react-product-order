// import { useQuery } from '@tanstack/react-query';
import { Navigate, useLocation } from 'react-router-dom';

import { useCurrentProduct } from '@/api/hooks/useGetProduct';
import { OrderInfoSection } from '@/components/features/Order/OrderInfoSection';
import { OrderMessageSection } from '@/components/features/Order/OrderMessageSection';
import { OrderProductSection } from '@/components/features/Order/OrderProductSection';
import { RouterPath } from '@/routes/path';

export const OrderPage = () => {
  const location = useLocation();
  const { productKey, productCount } = location.state;
  const { isRender, currentProduct } = useCurrentProduct(productKey);
  if (!isRender) return null;

  if (!currentProduct) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <OrderMessageSection />
      <OrderProductSection productKey={productKey} count={productCount} />
      <OrderInfoSection productKey={productKey} count={productCount} />
    </>
  );
};
