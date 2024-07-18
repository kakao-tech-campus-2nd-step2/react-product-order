import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useGetProductDetails } from '@/api/hooks/useGetProductDetails';
import { GiftInfoSection } from '@/components/features/Order/GiftInfoSection';
import { MessageSection } from '@/components/features/Order/MessageSection';
import { PaymentInfoSection } from '@/components/features/Order/PaymentInfoSection';
import { breakpoints } from '@/styles/variants';

export const OrderPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const quantity = location.state?.quantity ?? 1;
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const { data, isError, isLoading } = useGetProductDetails(productId!);

  const handlePaymentClick = () => {
    if (!messageRef.current?.value) {
      alert('메시지를 입력해주세요.');
      return;
    }

    if (messageRef.current.value.length > 100) {
      alert('메시지는 100자 이내로 입력해주세요.');
      return;
    }

    alert('주문이 완료되었습니다.');
  };

  if (isLoading) {
    return (
      <Flex w="100%" justifyContent="center" alignItems="center" padding="40px 16px 60px">
        <Spinner />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex
        w="100%"
        justifyContent="center"
        alignItems="center"
        padding="40px 16px 60px"
        fontSize="16px"
      >
        에러가 발생했습니다.
      </Flex>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Box w="100%">
      <Flex w="100%" justifyContent="center" alignItems="center">
        <Flex w="100%" maxW={breakpoints.lg} flexDirection="column">
          <Flex w="100%" position="relative">
            <Box as="main" w="100%" maxW="900px">
              <Box borderLeft="1px solid rgb(229, 229, 229)" h="calc(-54px + 100vh)">
                <MessageSection ref={messageRef} />
                <Box w="100%" backgroundColor="rgb(237, 237, 237)" h="8px" />
                <GiftInfoSection data={data} quantity={quantity} />
              </Box>
            </Box>
            <Box
              as="aside"
              position="sticky"
              top="54px"
              w="100%"
              maxW="360px"
              h="calc(-54px + 100vh)"
            >
              <PaymentInfoSection
                price={data.price.sellingPrice * quantity}
                onPaymentClick={handlePaymentClick}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
