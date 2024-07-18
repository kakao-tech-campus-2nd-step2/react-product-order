import type { FormEvent } from 'react';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderListWithMessage } from '@/components/features/Order/organisms/OrderListWithMessage';
import { OrderReceipt } from '@/components/features/Order/organisms/OrderReceipt';
import { ProductTemplate } from '@/components/templates/ProductTemplate';

export const OrderPage = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');
  const { state } = location;
  const { defaultKey, cntMap, totalPrice } = state;
  const currentProduct = cntMap.get(defaultKey);
  const cacheReceiptRefs = [useRef<HTMLSelectElement>(null), useRef<HTMLInputElement>(null)];

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
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
  };

  return (
    <form onSubmit={onSubmit}>
      <ProductTemplate
        leftMain={<OrderListWithMessage setMessage={setMessage} orderList={[currentProduct]} />}
        rightSide={<OrderReceipt cacheReceiptRefs={cacheReceiptRefs} totalPrice={totalPrice} />}
      />
    </form>
  );
};
