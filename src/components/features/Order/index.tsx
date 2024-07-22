import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useGetProduct } from '@/api/hooks/useGetProduct';

interface Errors {
  cardMessage?: string;
  cashReceiptNumber?: string;
}

export const Order = () => {
  const location = useLocation();
  const { productId, count } = location.state;
  const { data } = useGetProduct(productId);
  const [cardMessage, setCardMessage] = useState('');
  const [cashReceipt, setCashReceipt] = useState(false);
  const [cashReceiptNumber, setCashReceiptNumber] = useState('');
  const [cashReceiptType, setCashReceiptType] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!cardMessage) {
      newErrors.cardMessage = '메시지를 입력하세요.';
    } else if (cardMessage.length > 100) {
      newErrors.cardMessage = '카드 메시지는 100자 이내로 입력하세요.';
    }

    if (cashReceipt) {
      if (!cashReceiptType) {
        newErrors.cashReceiptNumber = '현금 영수증 유형을 선택하세요.';
      }
      if (!cashReceiptNumber) {
        newErrors.cashReceiptNumber = '현금 영수증 번호를 입력하세요.';
      } else if (!/^\d+$/.test(cashReceiptNumber)) {
        newErrors.cashReceiptNumber = '현금 영수증 번호는 숫자만 입력하세요.';
      }
    }

    setErrors(newErrors);
  };

  if (!data) return null;
  const product = data?.detail;

  return (
    <>
      <Text>productId: {productId}</Text>
      <Text>count: {count}</Text>
      <form onSubmit={handleSubmit}>
        <Flex direction="row" justifyContent="space-evenly">
          <Box p="4" w={700}>
            <FormControl isInvalid={!!errors.cardMessage} marginBottom={5}>
              <Center flexDirection="column">
                <FormLabel htmlFor="cardMessage">나에게 주는 선물</FormLabel>
                <Textarea
                  id="cardMessage"
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="선물과 함께 보낼 메시지를 적어보세요"
                />
              </Center>
              <FormErrorMessage>{errors.cardMessage}</FormErrorMessage>
            </FormControl>

            <FormLabel>선물내역</FormLabel>
            <Flex
              border="solid"
              direction="row"
              borderWidth={1}
              borderColor={'gray.200'}
              borderRadius={7}
              padding={5}
            >
              <Image
                src={data?.detail.imageURL}
                alt={data?.detail.name}
                boxSize="100px"
                objectFit="cover"
                marginRight={5}
              />

              <Text>{data?.detail.brandInfo.name}</Text>
              <Text>
                {data?.detail.name} X {count}개
              </Text>
            </Flex>
          </Box>
          <Box p="4">
            <FormLabel>결제 정보</FormLabel>
            <FormControl display="flex" alignItems="center" mt="4">
              <Checkbox
                id="cashReceipt"
                isChecked={cashReceipt}
                onChange={(e) => setCashReceipt(e.target.checked)}
              >
                현금영수증 신청
              </Checkbox>
            </FormControl>

            {cashReceipt && (
              <>
                <FormControl mt="4">
                  <FormLabel htmlFor="cashReceiptType">현금 영수증 유형</FormLabel>
                  <Select
                    id="cashReceiptType"
                    placeholder="유형 선택"
                    value={cashReceiptType}
                    onChange={(e) => setCashReceiptType(e.target.value)}
                  >
                    <option value="personal">개인소득공제</option>
                    <option value="business">사업자증빙용</option>
                  </Select>
                </FormControl>

                <FormControl isInvalid={!!errors.cashReceiptNumber} mt="4">
                  <FormLabel htmlFor="cashReceiptNumber">현금 영수증 번호</FormLabel>
                  <Input
                    id="cashReceiptNumber"
                    value={cashReceiptNumber}
                    onChange={(e) => setCashReceiptNumber(e.target.value)}
                    placeholder="숫자만 입력하세요"
                  />
                  <FormErrorMessage>{errors.cashReceiptNumber}</FormErrorMessage>
                </FormControl>
              </>
            )}

            <Button mt="4" colorScheme="teal" type="submit">
              {product.price.basicPrice * count}원 결제하기
            </Button>
          </Box>
        </Flex>
      </form>
    </>
  );
};
