import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Order: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product;

  const [receipt, setReceipt] = useState(false);
  const [taxType, setTaxType] = useState('personal');
  const [taxNumber, setTaxNumber] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [cardMessageError, setCardMessageError] = useState('');

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setReceipt(e.target.checked);
  const handleTaxTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setTaxType(e.target.value);
  const handleTaxNumberChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTaxNumber(e.target.value);
  const handleCardMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const message = e.target.value;
    if (message.length > 100) {
      setCardMessageError('메시지를 100자 이내로 입력해주세요.');
    } else {
      setCardMessageError('');
    }
    setCardMessage(message);
  };

  const handlePayment = () => {
    if (!cardMessage) {
      alert('메시지를 입력해주세요.');
      return;
    }
    if (cardMessage.length > 100) {
      setCardMessageError('메시지를 100자 이내로 입력해주세요.');
      return;
    }
    alert('결제하기 버튼을 눌렀습니다.');
  };

  if (!product) {
    return <Text>상품 정보가 없습니다.</Text>;
  }

  return (
    <Box p={4}>
      <Text fontSize="xl" mb={4}>
        나에게 주는 선물
      </Text>
      <Box mb={4}>
        <Input
          placeholder="선물과 함께 보낼 메시지를 적어보세요"
          value={cardMessage}
          onChange={handleCardMessageChange}
          isInvalid={!!cardMessageError}
        />
        {cardMessageError && (
          <Text color="red.500" mt={2}>
            {cardMessageError}
          </Text>
        )}
      </Box>
      <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
        <Text fontSize="lg" mb={2}>
          선물 내역
        </Text>
        <Flex>
          <Image
            src={product.imageUrl}
            alt="상품 이미지"
            boxSize="100px"
            objectFit="cover"
            mr={4}
          />
          <Box>
            <Text>{product.name}</Text>
            <Text>{product.price}원 x 1개</Text>
          </Box>
        </Flex>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" p={4} width="100%" mx="auto">
        <Text fontSize="xl" mb={4}>
          결제 정보
        </Text>
        <FormControl display="flex" alignItems="left" mb={4}>
          <Checkbox isChecked={receipt} onChange={handleReceiptChange} mr={2}>
            현금영수증 신청
          </Checkbox>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>공제 유형</FormLabel>
          <Select value={taxType} onChange={handleTaxTypeChange}>
            <option value="personal">개인소득공제</option>
            <option value="business">사업자지출증빙</option>
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>현금영수증 번호</FormLabel>
          <Input
            placeholder="(-없이) 숫자만 입력해주세요."
            value={taxNumber}
            onChange={handleTaxNumberChange}
          />
        </FormControl>
        <Box mb={4}>
          <Text>최종 결제금액</Text>
          <Text fontSize="2xl" fontWeight="bold">
            {product.price}원
          </Text>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button colorScheme="yellow" size="lg" width="50%" onClick={handlePayment}>
            {product.price}원 결제하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Order;
