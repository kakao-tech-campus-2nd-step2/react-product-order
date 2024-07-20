import { Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { usePostOrder } from '@/api/hooks/usePostOrder';
import { Container } from '@/components/common/layouts/Container';
import OrderProductInfo from '@/components/features/Order/OrderProductInfo';
import OrderReseipSection from '@/components/features/Order/OrderReseipsection';
import { useAuth } from '@/provider/Auth';
import type { Either } from '@/utils/either';
import { left, right } from '@/utils/either';
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

  const { register, handleSubmit } = useForm<OrderFormValues>({
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

  const validateMessageCard = (data: OrderFormValues): Either<string, OrderFormValues> => {
    if (!data.messageCardTextMessage) {
      return left('메시지를 입력해주세요.');
    }
    if (data.messageCardTextMessage.length > 100) {
      return left('메시지는 100자 이내로 입력해주세요.');
    }
    return right(data);
  };

  const validateCashReceipt = (data: OrderFormValues): Either<string, OrderFormValues> => {
    if (data.hasCashReceipt && !data.cashReceiptNumber) {
      return left('현금영수증 번호를 입력해주세요.');
    }
    if (data.cashReceiptNumber && !data.cashReceiptNumber.match(/^\d+$/)) {
      return left('현금영수증 번호는 숫자만 입력해주세요.');
    }
    return right(data);
  };

  const createOrderRequestBody = (data: OrderFormValues) => ({
    productId,
    productOptionId: 1,
    productQuantity: count,
    messageCardTemplateId: 1,
    messageCardTextMessage: data.messageCardTextMessage,
    senderId: 1,
    receiverId: 1,
    hasCashReceipt: data.hasCashReceipt,
    cashReceiptType: data.cashReceiptType,
    cashReceiptNumber: data.cashReceiptNumber,
  });

  const handleOrder = (data: OrderFormValues) => {
    const result = validateMessageCard(data) //
      .chain(validateCashReceipt)
      .map(createOrderRequestBody);

    if (result.isLeft()) {
      alert(result.value);
    } else {
      mutate(result.value);
      if (isSuccess) {
        alert('주문이 완료되었습니다.');
        orderLocalStorage.remove();
      }
    }
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
