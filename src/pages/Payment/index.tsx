import { Box, Button, Checkbox, Input, Select, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';

const PaymentPage = () => {
  const location = useLocation();
  const { product, quantity, totalPrice } = location.state;
  const [message, setMessage] = useState('');
  const [cashReceipt, setCashReceipt] = useState(false);
  const [cashReceiptNumber, setCashReceiptNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.length === 0) {
      alert('카드 메시지를 입력해주세요!');
      return;
    }

    alert('주문이 완료되었습니다.');
  };

  return (
    <Box>
      <Box
        as="header"
        padding="20px"
        borderBottom="1px solid #ddd"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="2xl" fontWeight="bold">
          선물하기
        </Text>
        <Text color="blue.500" cursor="pointer">
          내 계정
        </Text>
      </Box>
      <Container maxWidth="1280px" flexDirection="row" justifyContent="center">
        <Box display="flex" padding="20px" justifyContent="space-between">
          <Box width="60%">
            <Text fontSize="2xl" fontWeight="bold" marginBottom="20px">
              나에게 주는 선물
            </Text>
            <Textarea
              placeholder="선물과 함께 보낼 메시지를 적어보세요"
              marginBottom="20px"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <Box>
              <Text fontSize="xl" fontWeight="bold" marginBottom="10px">
                선물내역
              </Text>
              <Box display="flex" marginBottom="20px">
                <Box>
                  <img src={product.detail.imageURL} alt={product.detail.name} width="100px" />
                </Box>
                <Box marginLeft="20px">
                  <Text fontWeight="bold">{product.detail.brandInfo.name}</Text>
                  <Text>{product.detail.name}</Text>
                  <Text>수량: {quantity}개</Text>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box width="35%">
            <Text fontSize="xl" fontWeight="bold" marginBottom="20px">
              결제 정보
            </Text>
            <form onSubmit={handleSubmit}>
              <Checkbox
                marginBottom="20px"
                isChecked={cashReceipt}
                onChange={(e) => setCashReceipt(e.target.checked)}
              >
                현금영수증 신청
              </Checkbox>
              {cashReceipt && (
                <Input
                  placeholder="(-없이) 숫자만 입력해주세요."
                  marginBottom="20px"
                  value={cashReceiptNumber}
                  onChange={(e) => setCashReceiptNumber(e.target.value)}
                />
              )}

              <Select placeholder="개인소득공제" marginBottom="20px">
                <option value="personal">개인소득공제</option>
                <option value="business">사업자 지출증빙</option>
              </Select>

              <Box
                display="flex"
                justifyContent="space-between"
                fontWeight="bold"
                marginBottom="20px"
              >
                <Text>최종 결제금액</Text>
                <Text>{totalPrice.toLocaleString()}원</Text>
              </Box>
              <Button colorScheme="yellow" width="100%" type="submit">
                {totalPrice.toLocaleString()}원 결제하기
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PaymentPage;
