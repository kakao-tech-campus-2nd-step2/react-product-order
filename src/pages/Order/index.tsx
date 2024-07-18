import { Box, Button, ChakraProvider, Checkbox, Flex, HStack, Image, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const Order = () => {
    const location = useLocation();
    const { productDetail, quantity, price } = location.state || {};

    // ref 사용하여 폼 필드 접근
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const receiptRequestedRef = useRef<HTMLInputElement>(null);
    const receiptTypeRef = useRef<HTMLSelectElement>(null);
    const receiptNumberRef = useRef<HTMLInputElement>(null);

    // 상태로 관리할 필요가 없는 경우
    const [formState, setFormState] = useState({
        message: '',
        receiptRequested: false,
        receiptType: '',
        receiptNumber: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormState(prevState => ({
                ...prevState,
                [name]: checked
            }));
        } else {
            setFormState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = () => {
        const orderData = {
            message: messageRef.current?.value || '',
            receiptRequested: receiptRequestedRef.current?.checked || false,
            receiptType: receiptTypeRef.current?.value || '',
            receiptNumber: receiptNumberRef.current?.value || '',
            productDetail,
            quantity,
            price
        };
        console.log('Order Data:', orderData);
        // 여기에 주문 데이터를 처리하는 로직을 추가하세요
    };

    return (
        <div>
            <ChakraProvider>
                <Flex direction={{ base: 'column', md: 'row' }}>
                    <Box p={4} width={800} ml={200} mt={20}>
                        <Text fontSize="xl" mb={4} align={'center'} fontWeight={700}>나에게 주는 선물</Text>
                        <Input as={Textarea} placeholder="선물과 함께 보낼 메시지를 적어보세요" size="lg" mb={8} height={100} ref={messageRef} name='message' value={formState.message} onChange={handleInputChange}/>
                        
                        <Text fontSize="xl" mb={4}>선물내역</Text>
                        <Box p={4} borderWidth="1px" borderRadius="lg" mb={8}>
                            <HStack>
                                <Image boxSize="100px" src={productDetail.imageURL} alt="싸이버거 세트" />
                                <VStack align="start">
                                <Text fontSize="md" fontWeight="bold">{productDetail?.brandInfo.name}</Text>
                                <Text>{productDetail?.name} X {quantity}개</Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </Box>
                    <Box p={4} width={400}>
                        <Text fontSize="xl" mb={4} mt={20} fontWeight={700}>결제 정보</Text>
                            <VStack align="start" mb={4}>
                            <Checkbox mt={5} ref={receiptRequestedRef} name="receiptRequested" isChecked={formState.receiptRequested} onChange={handleInputChange}>현금영수증 신청</Checkbox>
                            <Select ref={receiptTypeRef} name="receiptType" value={formState.receiptType} onChange={handleInputChange} >
                                <option value="개인소득공제">개인소득공제</option>
                                <option value="사업자증빙용">사업지증빙용</option>
                            </Select>
                            <Input placeholder="(-없이) 숫자만 입력해주세요." ref={receiptNumberRef} name="receiptNumber" value={formState.receiptNumber} onChange={handleInputChange} />
                            </VStack>
                            
                            <HStack justify="space-between" mb={4} mt={10}>
                            <Text fontSize="xl">최종 결제금액</Text>
                            <Text fontSize="xl">{price}원</Text>
                            </HStack>
                            
                            <Button colorScheme="yellow" size="lg" width="100%" onClick={handleSubmit}>{price}원 결제하기</Button>
                    </Box>
                </Flex>
                
            </ChakraProvider>
        </div>
    )
}

export default Order;
