import { OrderInfoSection } from '@/components/features/Order/OrderInfoSection';
import { OrderMessageSection } from '@/components/features/Order/OrderMessageSection';
import { OrderProductSection } from '@/components/features/Order/OrderProductSection';

export const OrderPage = () => {
  return (
    <>
      <OrderMessageSection />
      <OrderProductSection />
      <OrderInfoSection />
    </>
  );
};
