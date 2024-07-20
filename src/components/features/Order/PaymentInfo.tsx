import { Box, Checkbox, Input, Select, Text, VStack } from '@chakra-ui/react';

type Props = {
    price: number;
    isReceiptRequested: boolean;
    setIsReceiptRequested: (value: boolean) => void;
    receiptNumber: string;
    setReceiptNumber: (value: string) => void;
};

const PaymentInfo = ({ price, isReceiptRequested, setIsReceiptRequested,receiptNumber, setReceiptNumber }: Props) => {
    return (
        <Box>
            <Text fontSize="lg" mb={2}>결제 정보</Text>
            <VStack align="start" spacing={4}>
                <Checkbox 
                isChecked={isReceiptRequested}
                onChange={(e) => setIsReceiptRequested(e.target.checked)}
                >현금영수증 신청</Checkbox>
                <Select defaultValue="personal">
                    <option value="personal">개인소득공제</option>
                    <option value="business">사업자등록증</option>
                </Select>
                <Input 
                value={receiptNumber}
                onChange={(e) => setReceiptNumber(e.target.value)} 
                placeholder="(-없이) 숫자만 입력해주세요." />
            </VStack>
            <Text fontSize="xl" mt={4}>최종 결제금액: {price}원</Text>
        </Box>
    );
};

export default PaymentInfo;

