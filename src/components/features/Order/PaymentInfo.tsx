import { Box, Checkbox, Input, Select, Text, VStack } from '@chakra-ui/react';
import { useRef } from 'react';

type Porps = {
  price: number;
};

const PaymentInfo = ({ price }:Porps) => {
    const receiptRequestedRef = useRef(null);
    const receiptTypeRef = useRef(null);
    const receiptNumberRef = useRef(null);

    return (
        <Box>
            <Text fontSize="lg" mb={2}>결제 정보</Text>
            <VStack align="start" spacing={4}>
                <Checkbox ref={receiptRequestedRef}>현금영수증 신청</Checkbox>
                <Select ref={receiptTypeRef} placeholder="개인소득공제">
                    <option value="personal">개인소득공제</option>
                    <option value="business">사업자등록증</option>
                </Select>
                <Input ref={receiptNumberRef} placeholder="(-없이) 숫자만 입력해주세요." />
            </VStack>
            <Text fontSize="xl" mt={4}>최종 결제금액: {price}원</Text>
        </Box>
    );
};

export default PaymentInfo;
