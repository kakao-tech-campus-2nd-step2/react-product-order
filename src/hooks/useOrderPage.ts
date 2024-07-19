import type { FormEvent, RefObject } from 'react';
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

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isAnyRefInvalid(cacheReceiptRefs)) return;

      const checkboxCurrent = cacheReceiptRefs[0].current as HTMLInputElement;
      const typeCurrent = cacheReceiptRefs[1].current as HTMLSelectElement;
      const numberCurrent = cacheReceiptRefs[2].current as HTMLInputElement;

      console.log(message);
      if (isCardMessageInvalid(message, setWarning)) return;

      if (isCacheReceiptInvalid(checkboxCurrent, numberCurrent, setWarning)) return;

      //TODO: post 요청
      console.log(
        message,
        memState,
        checkboxCurrent.checked,
        typeCurrent.value,
        numberCurrent.value,
      );

      alert('주문이 완료되었습니다.');
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

const isAnyRefInvalid = (
  cacheReceiptRefs: (RefObject<HTMLInputElement> | RefObject<HTMLSelectElement>)[],
) => !cacheReceiptRefs.every((ref) => ref.current !== null);

const isCardMessageInvalid = (message: string, setWarning: (warning: string) => void) => {
  if (message.length === 0) {
    setWarning('카드 메세지를 입력해 주세요.');
    return true;
  }
  if (message.length > 100) {
    setWarning('카드 메세지를 100글자 이내로 입력해 주세요.');
    return true;
  }
  return false;
};

const isCacheReceiptInvalid = (
  checkboxCurrent: HTMLInputElement,
  numberCurrent: HTMLInputElement,
  setWarning: (warning: string) => void,
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
