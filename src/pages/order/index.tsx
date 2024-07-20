import { Box, Button, ChakraProvider, HStack } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import GiftDetails from '@/components/features/Order/GiftDetails';
import MessageArea from '@/components/features/Order/Message';
import PaymentInfo from '@/components/features/Order/PaymentInfo';

type FormData = {
  message: string;
  isReceiptRequested: boolean;
  receiptNumber: string;
};

const OrderPage: React.FC = () => {
    const location = useLocation();
    const { productDetail, quantity, price } = location.state || {
      productDetail: {},
      quantity: 1,
      price: 0,
    };

    const { control, handleSubmit } = useForm<FormData>({
        defaultValues: {
            message: "",
            isReceiptRequested: false,
            receiptNumber: "",
        }
    });

    const onSubmit = (data: FormData) => {

        if (data.message === '') {
            alert("메시지를 입력해주세요");
            return;
        } else if (data.message.length > 100) {
            alert("메시지는 100자 이내로 입력해주세요.");
            return;
        }

        if (data.isReceiptRequested) {
            if (!data.receiptNumber) {
                alert("현금영수증 번호를 입력해주세요.");
                return;
            } else if (!data.receiptNumber.match(/^\d+$/)) {
                console.log("숫자오류 확인");
                alert("현금영수증 번호는 숫자만 입력해주세요.");
                return;
            }
        }

        window.alert('주문이 완료되었습니다.');
    };

    return (
        <ChakraProvider>
            <form onSubmit={handleSubmit(onSubmit)}>
                <HStack spacing={4} align="stretch" w="100%" mr="50px" ml="50px">
                    <Box w="70%">
                        <Controller
                            name="message"
                            control={control}
                            render={({ field }) => (
                                <MessageArea
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <GiftDetails productDetail={productDetail} quantity={quantity} />
                    </Box>
                    <Box w="30%">
                        <PaymentInfo
                            price={price}
                            control={control}
                        />
                        <Button type="submit" colorScheme="yellow" size="lg">{price}원 결제하기</Button>
                    </Box>
                </HStack>
            </form>
        </ChakraProvider>
    );
};

export default OrderPage;

