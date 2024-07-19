import { Box, Button, ChakraProvider, HStack } from '@chakra-ui/react';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

import GiftDetails from '@/components/features/Order/GiftDetails';
import MessageArea from '@/components/features/Order/Message';
import PaymentInfo from '@/components/features/Order/PaymentInfo';

const OrderPage: React.FC = () => {
    const location = useLocation();
    const { productDetail, quantity, price } = location.state || {};

    const messageRef = useRef<HTMLTextAreaElement>(null);
    const receiptRequestedRef = useRef<HTMLInputElement>(null);
    const receiptNumberRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const message = messageRef.current?.value || '';
        const receiptRequested = receiptRequestedRef.current?.checked || false;
        const receiptNumber = receiptNumberRef.current?.value || '';

        if (message === '') {
            alert("메시지를 입력해주세요");
            return;
        } else if (message.length > 100) {
            alert("메시지는 100자 이내로 입력해주세요.");
            return;
        }

        if (receiptRequested) {
            if (!receiptNumber) {
                alert("현금영수증 번호를 입력해주세요.");
                return;
            } else if (!receiptNumber.match(/^\d+$/)) {
                alert("현금영수증 번호는 숫자만 입력해주세요.");
                return;
            }
        }

        console.log('주문 처리 로직 실행');
        window.alert('주문이 완료되었습니다.');
    };

    return (
        <ChakraProvider>
            <form onSubmit={handleSubmit}>
                <HStack spacing={4} align="stretch" w="100%" mr="50px" ml="50px">
                    <Box w="70%">
                        <MessageArea ref={messageRef} />
                        <GiftDetails productDetail={productDetail} quantity={quantity} />
                    </Box>
                    <Box w="30%">
                        <PaymentInfo
                            price={price}
                            receiptRequestedRef={receiptRequestedRef}
                            receiptNumberRef={receiptNumberRef}
                        />
                        <Button type="submit" colorScheme="yellow" size="lg">{price}원 결제하기</Button>
                    </Box>
                </HStack>
            </form>
        </ChakraProvider>
    );
};

export default OrderPage;
