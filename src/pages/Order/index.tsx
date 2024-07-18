import { useState } from 'react';
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
  console.log(message, currentProduct, totalPrice);
  return (
    <ProductTemplate
      leftMain={<OrderListWithMessage setMessage={setMessage} orderList={[currentProduct]} />}
      rightSide={<OrderReceipt totalPrice={totalPrice} />}
    />
  );
};
