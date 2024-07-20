import { Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { usePostOrder } from '@/api/hooks/usePostOrder';
import { Container } from '@/components/common/layouts/Container';
import OrderProductInfo from '@/components/features/Order/OrderProductInfo';
import OrderReseipSection from '@/components/features/Order/OrderReseipsection';
import { useAuth } from '@/provider/Auth';
import { orderLocalStorage } from '@/utils/storage';

type ReceiptType = 'PERSONAL' | 'BUSINESS';

export interface OrderFormValues {
  messageCardTextMessage: string;
  hasCashReceipt: boolean;
  cashReceiptNumber: string;
  cashReceiptType: ReceiptType;
}

const OrderPage = () => {
  const storedOrderItem = orderLocalStorage.get();

  const { register, handleSubmit, setFocus } = useForm<OrderFormValues>({
    defaultValues: {
      messageCardTextMessage: '',
      hasCashReceipt: false,
      cashReceiptNumber: '',
      cashReceiptType: 'PERSONAL' as ReceiptType,
    },
  });

  const { mutate, isSuccess } = usePostOrder();

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

  const handleOrder = (data: OrderFormValues) => {
    const { messageCardTextMessage, hasCashReceipt, cashReceiptNumber, cashReceiptType } = data;

    if (!messageCardTextMessage) {
      alert('메시지를 입력해주세요.');
      setFocus('messageCardTextMessage');
      return;
    }

    if (messageCardTextMessage.length > 100) {
      alert('메시지는 100자 이내로 입력해주세요.');
      setFocus('messageCardTextMessage');
      return;
    }

    if (hasCashReceipt && !cashReceiptNumber) {
      alert('현금영수증 번호를 입력해주세요.');
      setFocus('cashReceiptNumber');
      return;
    }

    if (!cashReceiptNumber.match(/^\d+$/)) {
      alert('현금영수증 번호는 숫자만 입력해주세요.');
      setFocus('cashReceiptNumber');
      return;
    }

    const orderRequestBody = {
      productId,
      productOptionId: 1,
      productQuantity: count,
      messageCardTemplateId: 1,
      messageCardTextMessage,
      senderId: 1,
      receiverId: 1,
      hasCashReceipt,
      cashReceiptType,
      cashReceiptNumber,
    };

    mutate(orderRequestBody);

    if (isSuccess) {
      alert('주문이 완료되었습니다.');
    }

    orderLocalStorage.remove();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleOrder)}>
        <Flex display={'flex'} width={'100%'} gap={'16px'}>
          <OrderProductInfo productId={productId} register={register} />
          <OrderReseipSection count={count} productId={productId} register={register} />
        </Flex>
      </form>
    </Container>
  );
};

export default OrderPage;
