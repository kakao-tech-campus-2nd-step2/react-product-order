import { Box, Flex, Spinner } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';

import { useGetProductDetails } from '@/api/hooks/useGetProductDetails';
import { GiftInfoSection } from '@/components/features/Order/GiftInfoSection';
import { MessageSection } from '@/components/features/Order/MessageSection';
import { PaymentInfoSection } from '@/components/features/Order/PaymentInfoSection';
import { breakpoints } from '@/styles/variants';

type FormValues = {
  cardMessage: string;
  cashReceiptNumber: string;
  isCashReceipt: boolean;
  cashReceiptType: string;
};

export interface OrderPageLocationState {
  quantity: number;
}

export const OrderPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const { quantity } = (location.state || { quantity: 1 }) as OrderPageLocationState;

  const { data, isError, isLoading } = useGetProductDetails(productId!);

  const methods = useForm<FormValues>();

  const handlePaymentClick = () => {
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handlePaymentClick)}>
        <Box w="100%">
          <Flex w="100%" justifyContent="center" alignItems="center">
            <Flex w="100%" maxW={breakpoints.lg} flexDirection="column">
              <Flex w="100%" position="relative">
                <Box as="main" w="100%" maxW="900px">
                  <Box borderLeft="1px solid rgb(229, 229, 229)" h="calc(-54px + 100vh)">
                    <MessageSection />
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
                  <PaymentInfoSection price={data.price.sellingPrice * quantity} />
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </form>
    </FormProvider>
  );
};
