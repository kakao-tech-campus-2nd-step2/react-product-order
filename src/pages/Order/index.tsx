import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
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
    <OrderProvider>
      <OrderMessageSection />
      <OrderProductSection productKey={productKey} count={productCount} />
      <OrderInfoSection productKey={productKey} count={productCount} />
    </OrderProvider>
  );
};

type OrderContextType = {
  message: string;
  setMessage: (message: string) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string>('');

  return <OrderContext.Provider value={{ message, setMessage }}>{children}</OrderContext.Provider>;
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrderContext must be used within a OrderProvider');
  return context;
};
