import type { FormEvent } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useOrderPage = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');
  const { state } = location;

  const memState = useMemo(() => {
    const cntMap = state.cntMap;
    const orderList = [cntMap.get(state.defaultKey)];
    const totalPrice = state.totalPrice;
    return { orderList, totalPrice };
  }, [state]);
  const cacheReceiptRefs = [useRef<HTMLSelectElement>(null), useRef<HTMLInputElement>(null)];

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      const { totalPrice } = memState;
      const cntMap = state.cntMap;

      e.preventDefault();
      console.log(message);
      console.log(totalPrice);
      console.log(cntMap);
      cacheReceiptRefs.forEach((ref) => {
        if (!(ref && ref?.current)) {
          return;
        }
        console.log(ref?.current?.value);
      });
    },
    [memState],
  );

  return { setMessage, memState, onSubmit, cacheReceiptRefs };
};