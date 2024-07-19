import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useOrderPage = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [warning, setWarning] = useState('');
  const { state } = location;

  const memState = useMemo(() => {
    const cntMap = state.cntMap;
    const orderList = [cntMap.get(state.defaultKey)];
    const totalPrice = state.totalPrice;
    return { orderList, totalPrice };
  }, [state]);

  const rawCacheReceiptRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLSelectElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const cacheReceiptRefs = useMemo(() => rawCacheReceiptRefs, []);

  const isCacheReceiptInvalid = (
    checkboxCurrent: HTMLInputElement,
    numberCurrent: HTMLInputElement,
  ) => {
    if (checkboxCurrent.checked) {
      if (!numberCurrent.value) {
        setWarning('현금영수증 번호를 입력해 주세요.');
        return true;
      }
      if (!/^\d+$/.test(numberCurrent.value)) {
        setWarning('현금영수증 번호는 숫자만 입력해 주세요.');
        return true;
      }
      return false;
    }
  };

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!cacheReceiptRefs.every((ref) => ref.current !== null)) {
        return;
      }
      const checkboxCurrent = cacheReceiptRefs[0].current as HTMLInputElement;
      // const typeCurrent = cacheReceiptRefs[1].current as HTMLSelectElement;
      const numberCurrent = cacheReceiptRefs[2].current as HTMLInputElement;

      if (isCacheReceiptInvalid(checkboxCurrent, numberCurrent)) {
        return;
      }
    },
    [memState, message],
  );

  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        setWarning('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);

  return { setMessage, memState, onSubmit, cacheReceiptRefs, warning };
};
