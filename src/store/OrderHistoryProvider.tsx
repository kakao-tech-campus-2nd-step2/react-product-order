import { createContext, useEffect, useState } from 'react';
export interface OrderHistoryToken {
  id: number;
  count: number;
}
interface OrderHistoryContextType {
  orderHistoryToken: OrderHistoryToken;
  setOrderHistoryToken: (orderHistoryToken: OrderHistoryToken) => void;
}
export const OrderHistoryContext = createContext<OrderHistoryContextType>({
  orderHistoryToken: { id: 0, count: 0 },
  setOrderHistoryToken: () => {},
});

export function OrderHistoryProvider({ children }: { children: React.ReactNode }) {
  const token = sessionStorage.getItem('orderHistory');
  const [orderHistoryToken, setOrderHistoryToken] = useState<OrderHistoryToken>({ id: 0, count: 0 });

  useEffect(() => {
    if (token) {
      setOrderHistoryToken(JSON.parse(token));
    }
  }, [token]);
  return (
    <OrderHistoryContext.Provider value={{ orderHistoryToken, setOrderHistoryToken }}>
      {children}
    </OrderHistoryContext.Provider>
  );
}
