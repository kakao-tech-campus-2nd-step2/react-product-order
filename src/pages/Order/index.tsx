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

type OrderMessageContextType = {
  message: string;
  setMessage: (message: string) => void;
  isRecipt: boolean;
  setIsRecipt: (isRecipt: boolean) => void;
  receiptNumber: string;
  setReciptNumber: (receiptNumber: string) => void;
};

const OrderMessageContext = createContext<OrderMessageContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string>('');
  const [isRecipt, setIsRecipt] = useState<boolean>(false);
  const [receiptNumber, setReciptNumber] = useState<string>('');

  return (
    <OrderMessageContext.Provider
      value={{ message, setMessage, isRecipt, setIsRecipt, receiptNumber, setReciptNumber }}
    >
      {children}
    </OrderMessageContext.Provider>
  );
};

export const useOrderMessageContext = () => {
  const context = useContext(OrderMessageContext);
  if (!context) throw new Error('useOrderMessageContext must be used within a OrderProvider');
  return context;
};
