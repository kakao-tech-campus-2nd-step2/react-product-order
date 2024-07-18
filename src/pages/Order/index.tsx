import { Box, Button, Checkbox, HStack, Image, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Header } from '@/components/features/Layout/Header';

const OrderPage = () => {
  const location = useLocation();
  const { product, quantity } = location.state || {};
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const [isCashReceipt, setIsCashReceipt] = useState(false);
  const [cashReceiptNumber, setCashReceiptNumber] = useState('');

  if (!product || !quantity) {
    return <Text>잘못된 접근입니다.</Text>;
  }

  const totalPrice = product.price.sellingPrice * quantity;

  const handlePaymentClick = () => {
    if (messageRef.current) {
      if (!messageRef.current.value) {
        alert('메시지를 입력해주세요.');
        return;
      }
      if (messageRef.current.value.length > 100) {
        alert('카드 메시지는 100자 이내로 입력해주세요.');
        return;
      }
    } else {
      alert('메시지 입력란을 찾을 수 없습니다.');
      return;
    }

    if (isCashReceipt) {
      if (!cashReceiptNumber) {
        alert('현금 영수증 번호를 입력해주세요.');
        return;
      }
      if (!/^\d+$/.test(cashReceiptNumber)) {
        alert('현금영수증 번호는 숫자로만 입력해주세요.');
        return;
      }
    }

    alert('주문이 완료되었습니다.');
  };

  return (
    <Box p={5}>
      <Box position="fixed" top="0" left="0" width="100%" zIndex="1000">
        <Header />
      </Box>
      <Text fontSize="2xl" fontWeight="bold">선물하기</Text>
      <Box mt={5} borderWidth="1px" borderRadius="lg" p={5}>
        <Text fontSize="xl" fontWeight="bold">나에게 주는 선물</Text>
        <Textarea mt={3} placeholder="선물과 함께 보낼 메시지를 적어보세요" ref={messageRef} />

        <Box mt={5}>
          <Text fontSize="xl" fontWeight="bold">선물내역</Text>
          <HStack mt={3} spacing={5}>
            <Image src={product.imageURL} alt={product.name} boxSize="100px" />
            <VStack align="start">
              <Text>{product.brandInfo.name}</Text>
              <Text>{product.name} x {quantity}개</Text>
            </VStack>
          </HStack>
        </Box>
      </Box>

      <Box mt={5} borderWidth="1px" borderRadius="lg" p={5}>
        <Text fontSize="xl" fontWeight="bold">결제 정보</Text>
        <Checkbox mt={3} isChecked={isCashReceipt} onChange={(e) => setIsCashReceipt(e.target.checked)}>
          현금영수증 신청
        </Checkbox>
        <Select mt={3} placeholder="개인소득공제">
          <option value="business">사업자증빙용</option>
        </Select>
        <Input 
          mt={3} 
          placeholder="(-없이) 숫자만 입력해주세요." 
          value={cashReceiptNumber} 
          onChange={(e) => setCashReceiptNumber(e.target.value)} 
        />
        

        <Button
          mt={5}
          bg="yellow.400"
          color="black"
          width="full"
          _hover={{ bg: 'yellow.500' }}
          onClick={handlePaymentClick}
        >
          {totalPrice}원 결제하기
        </Button>
      </Box>
    </Box>
  );
};

export default OrderPage;
