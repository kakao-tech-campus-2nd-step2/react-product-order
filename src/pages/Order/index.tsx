import { LoadingView } from '@/components/common/LoadingView/LoadingView';
import { OrderForm } from '@/components/features/Order';
import { useHandleOrderHistory } from '@/hooks/useHandleOrderHistory';

export const OrderPage = () => {
  const { orderHistory } = useHandleOrderHistory();

  if (!orderHistory) return <LoadingView />;

  return (
    <>
      <OrderForm orderHistory={orderHistory} />
    </>
  );
};
