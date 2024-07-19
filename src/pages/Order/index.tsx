import { Container, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useState } from 'react';

import { Section1, Section2 } from '@/components/features/order';

export type OrderDataType = {
  giftOrderLimit: number;
  hasOption: boolean;
  name: string[];
  options: { key: string; value: string }[];
  productId: number;
  productName: string;
  productPrice: number;
};
type PaymentInfo = {
  message: string;
  receipt: boolean;
  receiptNumber: number;
};

export type OrderContextType = {
  options: OrderDataType;
  count: number;
  paymentInfo: {
    message: string;
    receipt: boolean;
    receiptNumber: number;
  };
  setPaymentInfo: (info: PaymentInfo) => void;
  onClickPayment: () => void;
};

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

const productInfo = sessionStorage.getItem('orderHistory')
  ? JSON.parse(sessionStorage.getItem('orderHistory')!)
  : {};

const [id, count] = [productInfo.id, Number(productInfo.count)];

const fetchOrder = async () => {
  const response = await axios.get(
    `https://kakao-tech-campus-mock-sercer-root-yongjin.vercel.app/api/v1/products/${2383657}/options`,
  );
  return response.data;
};

export default function OrderPage() {
  const { data = { options: {} } } = useQuery({
    queryKey: ['order', id],
    queryFn: fetchOrder,
  });

  const [paymentInfo, setPaymentInfo] = useState({
    message: '',
    receipt: false,
    receiptNumber: 0,
  });

  const onClickPayment = () => {
    if (paymentInfo?.message === '') {
      alert('메시지를 입력해주세요.');
      return;
    }
    if (paymentInfo?.message && paymentInfo?.message.length >= 100) {
      alert('메시지는 100자 이내로 입력해주세요.');
      return;
    }
    if (paymentInfo?.receipt && paymentInfo?.receiptNumber === 0) {
      alert('현금영수증 번호를 입력해주세요.');
      return;
    }
    if (paymentInfo?.receipt && isNaN(paymentInfo?.receiptNumber)) {
      alert('숫자만 입력해주세요.');
      return;
    }
    alert('결제가 완료되었습니다.');
  };

  return (
    <Container w="100%" maxW="1250px" h="100vh">
      <Flex>
        <OrderContext.Provider
          value={{ options: data.options, count, paymentInfo, setPaymentInfo, onClickPayment }}
        >
          <Section1 />
          <Section2 />
        </OrderContext.Provider>
      </Flex>
    </Container>
  );
}
