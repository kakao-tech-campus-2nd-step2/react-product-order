import { Box, Button,ChakraProvider, Checkbox, Flex, HStack, Image, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';


export const Order = () => {

    const location = useLocation();
    const { productDetail, quantity, price } = location.state || {};

  return (
    <div>
        <ChakraProvider>
            <Flex direction={{ base: 'column', md: 'row' }}>
                <Box p={4} width={800} ml={200} mt={20}>
                    <Text fontSize="xl" mb={4} align={'center'} fontWeight={700}>나에게 주는 선물</Text>
                    <Input as={Textarea} placeholder="선물과 함께 보낼 메시지를 적어보세요" size="lg" mb={8} height={100} />
                    
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
                        <Checkbox mt={5}>현금영수증 신청</Checkbox>
                        <Select>
                            <option value="1">개인소득공제</option>
                            <option value="2">사용자 증빙용</option>
                        </Select>
                        <Input placeholder="(-없이) 숫자만 입력해주세요." />
                        </VStack>
                        
                        <HStack justify="space-between" mb={4} mt={10}>
                        <Text fontSize="xl">최종 결제금액</Text>
                        <Text fontSize="xl">{price}원</Text>
                        </HStack>
                        
                        <Button colorScheme="yellow" size="lg" width="100%">{price}원 결제하기</Button>
                </Box>
            </Flex>
            
        </ChakraProvider>
    </div>
  )
}

export default Order