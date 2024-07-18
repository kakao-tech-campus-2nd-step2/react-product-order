import { Container } from '@/components/common/layouts/Container';
import OrderSection from '@/components/features/Order/OrderSection';
import { orderLocalStorage } from '@/utils/storage';

const OrderPage = () => {
  const storedOrderItem = orderLocalStorage.get();
  if (!storedOrderItem) {
    return <div>주문 정보가 없습니다.</div>;
  }
  const { count, productId } = storedOrderItem;

  return (
    <Container>
      <OrderSection count={count} productId={productId} />
    </Container>
  );
};

export default OrderPage;
