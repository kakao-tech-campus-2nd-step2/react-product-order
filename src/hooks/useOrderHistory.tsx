import { useContext } from 'react';

import { OrderHistoryContext } from '@/store/OrderHistoryProvider';

export const useOrderHistory = () => {
  return useContext(OrderHistoryContext);
};
