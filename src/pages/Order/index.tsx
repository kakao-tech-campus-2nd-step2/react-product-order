import { Flex } from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import OrderProductInfo from '@/components/features/Order/OrderProductInfo';
import OrderReseipSection from '@/components/features/Order/OrderReseipsection';
import { useAuth } from '@/provider/Auth';
import { orderLocalStorage } from '@/utils/storage';

const OrderPage = () => {
  const storedOrderItem = orderLocalStorage.get();

  const messageCardTextMessageRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const authInfo = useAuth();
  if (!authInfo) {
    navigate('/');
    return null;
  }
  if (!storedOrderItem) {
    return <div>주문 정보가 없습니다.</div>;
  }
  const { count, productId } = storedOrderItem;

  return (
    <Container>
      <Flex display={'flex'} width={'100%'} gap={'16px'}>
        <OrderProductInfo
          productId={productId}
          messageCardTextMessageRef={messageCardTextMessageRef}
        />
        <OrderReseipSection
          count={count}
          messageCardTextMessageRef={messageCardTextMessageRef}
          productId={productId}
        />
      </Flex>
    </Container>
  );
};

export default OrderPage;
