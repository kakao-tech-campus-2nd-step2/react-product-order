import { OrderListWithMessage } from '@/components/features/Order/organisms/OrderListWithMessage';
import { OrderReceipt } from '@/components/features/Order/organisms/OrderReceipt';
import { ProductTemplate } from '@/components/templates/ProductTemplate';
import { useOrderPage } from '@/hooks/useOrderPage';

export const orderLetterPlaceHolder = `선물과 함께 보낼 메시지를 적어보세요`;

export const OrderPage = () => {
  const { onSubmit, memState, setMessage, cacheReceiptRefs } = useOrderPage();
  return (
    <form onSubmit={onSubmit}>
      <ProductTemplate
        leftMain={<OrderListWithMessage setMessage={setMessage} orderList={memState.orderList} />}
        rightSide={
          <OrderReceipt cacheReceiptRefs={cacheReceiptRefs} totalPrice={memState.totalPrice} />
        }
      />
    </form>
  );
};
