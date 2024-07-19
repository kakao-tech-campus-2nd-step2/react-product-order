import type { FormEvent, RefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { IOrderItemInfo } from '@/hooks/useProductPreReceipt';

export const useOrderValidation = (orderListAndPrice: IOrderItemInfo[]) => {
  const [message, setMessage] = useState('');
  const [warning, setWarning] = useState('');

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

      const [checkboxCurrent, typeCurrent, numberCurrent] = cacheReceiptRefs.map(
        (ref) => ref.current,
      ) as [HTMLInputElement, HTMLSelectElement, HTMLInputElement];

      if (isCardMessageInvalid(message, setWarning)) return;

      if (isCacheReceiptInvalid(checkboxCurrent, numberCurrent, setWarning)) return;

      //TODO: post 요청
      console.log(
        message,
        orderListAndPrice,
        checkboxCurrent.checked,
        typeCurrent.value,
        numberCurrent.value,
      );

      alert('주문이 완료되었습니다.');
    },
    [orderListAndPrice, message],
  );

  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => {
        setWarning('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [warning]);

  return { setMessage, onSubmit, cacheReceiptRefs, warning };
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
  if (!checkboxCurrent.checked) return false;

  if (!numberCurrent.value) {
    setWarning('현금영수증 번호를 입력해 주세요.');
    return true;
  }
  if (!/^\d+$/.test(numberCurrent.value)) {
    setWarning('현금영수증 번호는 숫자만 입력해 주세요.');
    return true;
  }

  return false;
};
