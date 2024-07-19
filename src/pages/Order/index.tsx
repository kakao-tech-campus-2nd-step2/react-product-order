import { CircularProgress, Container, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useContext, useState } from 'react';

import { Section1, Section2 } from '@/components/features/order';
import { PaymentContext } from '@/provider/Payment/index';

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
  imageURL: string;
};

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

const fetchOrder = async (id: string) => {
  const response = await axios.get(
    `https://kakao-tech-campus-mock-sercer-root-yongjin.vercel.app/api/v1/products/${id}/options`,
  );
  return response.data;
};

export default function OrderPage() {
  const payment = useContext(PaymentContext);
  console.log(payment?.paymentInfo.productId);
  const [count = 1, productId = '1', imageURL = ''] = [
    payment?.paymentInfo.count,
    payment?.paymentInfo.productId,
    payment?.paymentInfo.imageURL,
  ];
  const {
    data = { options: {} },
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['order', payment?.paymentInfo.productId],
    queryFn: () => fetchOrder(productId),
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

  const statusElem = (() => {
    if (isLoading)
      return (
        <Flex w="100%" justify="center">
          <CircularProgress isIndeterminate color="yellow.300" />
        </Flex>
      );
    if (isError)
      return (
        <Flex w="100%" justify="center">
          데이터를 불러오는 중에 문제가 발생했습니다.
        </Flex>
      );
  })();

  return (
    <Container w="100%" maxW="1250px" h="100vh">
      <Flex>
        {isLoading || isError ? (
          statusElem
        ) : (
          <OrderContext.Provider
            value={{
              options: data.options,
              count,
              paymentInfo,
              setPaymentInfo,
              onClickPayment,
              imageURL,
            }}
          >
            <Section1 />
            <Section2 />
          </OrderContext.Provider>
        )}
      </Flex>
    </Container>
  );
}
