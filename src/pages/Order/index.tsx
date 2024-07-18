import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Spinner,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

interface ProductDetail {
  id: number;
  name: string;
  imageURL: string;
  brandInfo: {
    name: string;
  };
}

export const OrderPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { state } = useLocation();
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [receiptRequested, setReceiptRequested] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('');

  useEffect(() => {
    const fetchProductOrder = async () => {
      try {
        const response = await axios.get(
          `https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${orderId}/detail`,
        );
        const data = response.data.detail;

        setProductDetail({
          id: data.id,
          name: data.name,
          imageURL: data.imageURL,
          brandInfo: {
            name: data.brandInfo.name,
          },
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };
    fetchProductOrder();
  }, [orderId]);

  if (isLoading || !productDetail) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const handleSubmit = () => {
    if (!message.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    }
    if (message.length > 100) {
      alert('메시지를 100자 이내로 입력해주세요.');
      return;
    }
    if (receiptRequested && !receiptNumber.trim()) {
      alert('현금 영수증 번호를 입력해주세요.');
      return;
    }
    alert('결제가 완료되었습니다.');
  };

  const handleReceiptRequestChange = () => {
    setReceiptRequested(!receiptRequested);
  };

  return (
    <Flex justifyContent="space-between" padding="20px" height="100vh">
      <Box flex="3" borderRight="1px solid rgb(237, 237, 237)">
        <Flex
          flexDirection="column"
          justifyContent="centers"
          alignItems="center"
          borderBottom="8px solid #EDEDED"
        >
          <Text fontSize="lg" fontWeight="bold">
            나에게 주는 선물
          </Text>
          <Box width="100%" padding="30px 60px">
            <Input
              type="text"
              placeholder="선물과 함께 보낼 메시지를 적어보세요"
              mt="4"
              bgColor="#EDF2F7"
              height="100px"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Box>
        </Flex>
        <Flex flexDirection="column" padding="16px">
          <Text fontSize="lg" fontWeight="bold">
            선물내역
          </Text>
          <Flex
            mt="16px"
            border="2px solid rgb(237, 237, 237)"
            borderRadius="8px"
            padding="20px 16px 16px"
          >
            <Image src={productDetail.imageURL} alt={productDetail.name} boxSize="65px" />
            <Flex flexDirection="column" ml="8px">
              <Text color="gray.600" fontSize="13px">
                {productDetail.brandInfo.name}
              </Text>
              <Text mb="4" fontSize="14px">
                {productDetail.name}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <Box flex="2" padding="16px">
        <Text fontSize="lg" fontWeight="bold" py="20px" borderBottom="1px solid rgb(237, 237, 237)">
          결제 정보
        </Text>
        <Flex
          borderBottom="1px solid rgb(237, 237, 237)"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          p="4"
          mb="4"
        >
          <FormControl display="flex" alignItems="center">
            <Checkbox mr="4" onChange={handleReceiptRequestChange} isChecked={receiptRequested} />
            <FormLabel mb="0">현금 영수증 신청</FormLabel>
          </FormControl>

          <FormControl display="flex" alignItems="center" mt="4">
            <Select>
              <option value="personal">개인소득공제</option>
              <option value="business">사업자증빙용</option>
            </Select>
          </FormControl>
          <FormControl mt="4">
            <Input
              id="receiptNumber"
              type="text"
              placeholder="(-없이) 숫자만 입력해주세요."
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
            />
          </FormControl>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" bgColor="#F5F5F5" padding="20px">
          <Text fontSize="15px" fontWeight="bold">
            최종 결제 금액
          </Text>
          <Text fontSize="15px" fontWeight="bold">
            {state}원
          </Text>
        </Flex>
        <Button
          bgColor="#FEE500"
          mt="4"
          onClick={handleSubmit}
          width="100%"
          height="60px"
          boxSizing="border-box"
        >
          {state}원 결제하기
        </Button>
      </Box>
    </Flex>
  );
};
