import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import type { IOrderItemInfo } from '@/hooks/useProductPreReceipt';

export interface IOrderListAndPrice {
  orderList: IOrderItemInfo[];
  totalPrice: number;
}

export const useOrderListAndPrice: () => IOrderListAndPrice = () => {
  const location = useLocation();
  const { state } = location;

  return useMemo(() => {
    const cntMap = state.cntMap;
    const orderList = [cntMap.get(state.defaultKey)];
    const totalPrice = state.totalPrice;
    return { orderList, totalPrice };
  }, [state]);
};
