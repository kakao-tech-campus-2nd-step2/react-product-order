import { Box, Button, Checkbox,Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const CheckoutPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [cardMessage, setCardMessage] = useState('');
  const [cashReceipt, setCashReceipt] = useState(false);
  const [cashReceiptNumber, setCashReceiptNumber] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCheckout = () => {
    const newErrors: { [key: string]: string } = {};

    if (!cardMessage) {
      newErrors.cardMessage = '카드 메시지를 입력하세요.';
    } else if (cardMessage.length > 100) {
      newErrors.cardMessage = '카드 메시지는 100자 이내로 입력하세요.';
    }

    if (cashReceipt && !cashReceiptNumber) {
      newErrors.cashReceiptNumber = '현금영수증 번호를 입력하세요.';
    } else if (cashReceipt && !/^\d+$/.test(cashReceiptNumber)) {
      newErrors.cashReceiptNumber = '현금영수증 번호는 숫자만 입력하세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 결제 처리 로직 추가
    console.log(`Product ${productId} has been purchased with message: ${cardMessage}`);
  };

  return (
    <Box p="6">
      <Text fontWeight="bold" as="h1" fontSize="2xl">결제 페이지</Text>
      <Text>상품 ID: {productId}</Text>

      <Box mt="4">
        <Text>카드 메시지</Text>
        <Input
          value={cardMessage}
          onChange={(e) => setCardMessage(e.target.value)}
          placeholder="카드 메시지를 입력하세요"
        />
        {errors.cardMessage && <Text color="red">{errors.cardMessage}</Text>}
      </Box>

      <Box mt="4">
        <Checkbox
          isChecked={cashReceipt}
          onChange={(e) => setCashReceipt(e.target.checked)}
        >
          현금 영수증 신청
        </Checkbox>
        {cashReceipt && (
          <Input
            mt="2"
            value={cashReceiptNumber}
            onChange={(e) => setCashReceiptNumber(e.target.value)}
            placeholder="현금 영수증 번호를 입력하세요"
          />
        )}
        {errors.cashReceiptNumber && <Text color="red">{errors.cashReceiptNumber}</Text>}
      </Box>

      <Button colorScheme="teal" mt="4" onClick={handleCheckout}>결제하기</Button>
    </Box>
  );
};

export default CheckoutPage;
