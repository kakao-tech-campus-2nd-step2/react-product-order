import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Image,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/api/hooks/useAuth';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';

export const OrderPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const location = useLocation();
  const { productId, initialQuantity } = location.state || {};
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductDetail({ productId: productId ?? '' });
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(initialQuantity ?? 1);
  const [receiptType, setReceiptType] = useState<string>('personal');
  const [receiptNumber, setReceiptNumber] = useState('');
  const [isReceipt, setIsReceipt] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleIncrement = () => setQuantity((prev: number) => prev + 1);
  const handleDecrement = () => setQuantity((prev: number) => (prev > 1 ? prev - 1 : 1));

  const handlePayment = () => {
    setError(null);
    setSuccess(null);

    if (message.trim() === '') {
      setError('메시지를 입력해주세요.');
      return;
    }

    if (message.length > 100) {
      setError('메시지는 100자 이내로 입력해주세요.');
      return;
    }

    if (isReceipt) {
      if (receiptNumber.trim() === '') {
        setError('현금영수증 번호를 입력해주세요.');
        return;
      }

      if (!/^\d+$/.test(receiptNumber)) {
        setError('현금영수증 번호는 숫자로만 입력해주세요.');
        return;
      }
    }

    setSuccess('결제 되었습니다!');

    console.log('결제 처리');
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !productData) {
    return <Text>상품 정보를 불러오는 데 실패했습니다.</Text>;
  }

  const totalPrice = (productData?.price?.sellingPrice || 0) * quantity;

  return (
    <Flex padding="4" justifyContent="center">
      <HStack align="start" spacing="8">
        <VStack align="start" spacing="4" width="full">
          <Text fontSize="2xl" fontWeight="bold">
            나에게 주는 선물
          </Text>
          <Textarea
            placeholder="선물과 함께 보낼 메시지를 적어보세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {error && <Text color="red.500">{error}</Text>}
          {success && <Text color="green.500">{success}</Text>}
          <Text fontSize="2xl" fontWeight="bold">
            선물내역
          </Text>
          <Box border="1px" borderColor="gray.200" borderRadius="md" padding="4" width="full">
            <Flex align="center">
              <Image src={productData.imageURL} alt={productData.name} boxSize="100px" />
              <VStack align="start" spacing="1" ml="4">
                <Text fontWeight="bold">{productData.brandInfo.name}</Text>
                <Text>{productData.name}</Text>
                <Text>{productData.price.sellingPrice}원</Text>
                <HStack>
                  <Button onClick={handleDecrement} disabled={quantity <= 1}>
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                    min={1}
                    width="60px"
                    textAlign="center"
                  />
                  <Button onClick={handleIncrement}>+</Button>
                </HStack>
              </VStack>
            </Flex>
          </Box>
        </VStack>
        <VStack align="start" spacing="4">
          <Checkbox isChecked={isReceipt} onChange={(e) => setIsReceipt(e.target.checked)}>
            현금영수증 신청
          </Checkbox>
          <Select value={receiptType} onChange={(e) => setReceiptType(e.target.value)}>
            <option value="personal">개인소득공제</option>
            <option value="business">사업자증빙용</option>
          </Select>
          <Input
            placeholder="(숫자만 입력해주세요)"
            value={receiptNumber}
            onChange={(e) => setReceiptNumber(e.target.value)}
          />
          <Text fontSize="2xl" fontWeight="bold">
            최종 결제금액: {totalPrice}원
          </Text>
          <Button colorScheme="yellow" width="full" onClick={handlePayment}>
            {totalPrice}원 결제하기
          </Button>
        </VStack>
      </HStack>
    </Flex>
  );
};
