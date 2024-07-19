import { Box, Button, Checkbox, Flex, Image, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';


export const OrderPage = () => {
  const location = useLocation();
  const { name, price, quantity, totalPrice, imageURL } = location.state || { name: '', price: 0, quantity: 0, totalPrice: 0, imageURL: '' };

  return (
    <Flex p={5} align="center" justify="center">
      <Box flex="1" p={5} borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <VStack spacing={4} align="stretch">
          <Text fontSize="xl" fontWeight="bold">나에게 주는 선물</Text>
          <Textarea placeholder="선물과 함께 보낼 메시지를 작성해주세요" />
          <Text fontSize="lg" fontWeight="bold">선물 내역</Text>
          <Flex align="center">
            <Image boxSize="100px" src={imageURL} alt={name} />
            <VStack align="start" pl={4}>
              <Text fontWeight="bold">{name}</Text>
              <Text>{price.toLocaleString()}원 x {quantity}개</Text>
            </VStack>
          </Flex>
        </VStack>
      </Box>
      <Box flex="1" p={5}>
        <VStack spacing={4} align="stretch">
          <Text fontSize="xl" fontWeight="bold">결제 정보</Text>
          <Checkbox>현금영수증 신청</Checkbox>
          <Select placeholder="선택하세요">
            <option value="personal">개인소득공제</option>
            <option value="business">사업자증빙용</option>
          </Select>
          <Input placeholder="(- 없이) 숫자만 입력해주세요." />
          <Text fontSize="2xl" fontWeight="semibold">최종 결제금액</Text>
          <Text fontSize="2xl">{totalPrice.toLocaleString()}원</Text>
          <Button colorScheme="yellow" size="lg" width="full">{totalPrice} 결제하기</Button>
        </VStack>
      </Box>
    </Flex>
  );
};
