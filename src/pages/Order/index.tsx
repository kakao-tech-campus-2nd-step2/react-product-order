import { createPortal } from 'react-dom';

import { OrderToast } from '@/components/features/Order/atoms/OrderToast';
import { OrderListWithMessage } from '@/components/features/Order/organisms/OrderListWithMessage';
import { OrderReceipt } from '@/components/features/Order/organisms/OrderReceipt';
import { ProductTemplate } from '@/components/templates/ProductTemplate';
import { useOrderListAndPrice } from '@/hooks/useOrderListAndPrice';
import { useOrderValidation } from '@/hooks/useOrderValidation';

export const orderLetterPlaceHolder = `선물과 함께 보낼 메시지를 적어보세요`;

export const OrderPage = () => {
  const { orderList, totalPrice } = useOrderListAndPrice();
  const { warning, onSubmit, setMessage, cacheReceiptRefs } = useOrderValidation(orderList);
  return (
    <form onSubmit={onSubmit}>
      <ProductTemplate
        leftMain={<OrderListWithMessage setMessage={setMessage} orderList={orderList} />}
        rightSide={<OrderReceipt cacheReceiptRefs={cacheReceiptRefs} totalPrice={totalPrice} />}
      />
      {warning && createPortal(<OrderToast warning={warning} />, document.body)}
    </form>
  );
};
