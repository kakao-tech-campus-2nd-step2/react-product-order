import { Box, Button, ChakraProvider, HStack } from '@chakra-ui/react';
import {useRef} from 'react';
import { useLocation } from 'react-router-dom';

import GiftDetails from '@/components/features/Order/GiftDetails';
import MessageArea from '@/components/features/Order/Message';
import PaymentInfo from '@/components/features/Order/PaymentInfo';

const OrderPage: React.FC = () => {
    console.log('이동됐다?')

  const location = useLocation();
  const { productDetail, quantity, price } = location.state || {};

  const messageRef = useRef<HTMLTextAreaElement>(null);
  const receiptRequestedRef = useRef<HTMLInputElement>(null);
  const receiptTypeRef = useRef<HTMLSelectElement>(null);
  const receiptNumberRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const message = messageRef.current?.value || '';
      const receiptRequested = receiptRequestedRef.current?.checked || false;
      const receiptType = receiptTypeRef.current?.value || '';
      const receiptNumber = receiptNumberRef.current?.value || '';

      const orderData = {
          message,
          receiptRequested,
          receiptType,
          receiptNumber,
          productDetail,
          quantity,
          price
      };

      console.log('Order Data:', orderData);
      window.alert('주문이 완료되었습니다.');
  };

  return (
      <ChakraProvider>
          <form onSubmit={handleSubmit} >
              <HStack spacing={4} align="stretch" w="100%" mr="50px" ml="50px">
                <Box w="70%">
                  <MessageArea/>
                  <GiftDetails productDetail={productDetail} quantity={quantity} />
                </Box>
                <Box w="30%">
                  <PaymentInfo 
                      price={price}
                  />
                  <Button type="submit" colorScheme="yellow" size="lg">145000원 결제하기</Button>
                </Box>
              </HStack>
          </form>
      </ChakraProvider>
  );
};

export default OrderPage;



