import { Flex, HStack, VStack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { useOrderForm } from '@/api/hooks/useOrderFoam';
import { GiftDetails } from '@/components/features/Order/GiftDetails';
import { OrderForm } from '@/components/features/Order/OrderFoam';
import { PaymentDetails } from '@/components/features/Order/PaymentDetails';

export const OrderPage = () => {
  const location = useLocation();
  const { imageURL, name, totalPrice, brandName } = location.state || {};

  const {
    message,
    setMessage,
    isReceiptChecked,
    setIsReceiptChecked,
    receiptNumber,
    setReceiptNumber,
    handleClick,
  } = useOrderForm();

  return (
    <Flex minHeight="100vh" alignItems="top" justifyContent="center" padding="4">
      <HStack borderLeft="1px" borderRight="1px" borderColor="gray.200">
        <VStack px="60px" w="899px" h="100%">
          <OrderForm message={message} setMessage={setMessage} />
          <GiftDetails imageURL={imageURL} name={name} brandName={brandName} />
        </VStack>
        <PaymentDetails
          totalPrice={totalPrice}
          isReceiptChecked={isReceiptChecked}
          setIsReceiptChecked={setIsReceiptChecked}
          receiptNumber={receiptNumber}
          setReceiptNumber={setReceiptNumber}
          handleClick={handleClick}
        />
      </HStack>
    </Flex>
  );
};
