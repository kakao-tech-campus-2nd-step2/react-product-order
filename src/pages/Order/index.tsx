import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  Select,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

interface ProductDetail {
  id: number;
  name: string;
  imageURL: string;
  brandInfo: {
    name: string;
  };
}

export const OrderPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { state } = useLocation();
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [receiptRequested, setReceiptRequested] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('');

  useEffect(() => {
    const fetchProductOrder = async () => {
      try {
        const res = await axios.get(
          `https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${orderId}/detail`,
        );
        setProductDetail(res.data.detail);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductOrder();
  }, [orderId]);

  const handleSubmit = () => {
    const validateMessage = () => {
      if (!message.trim()) {
        alert('메시지를 입력해주세요.');
        return false;
      }
      if (message.length > 100) {
        alert('메시지를 100자 이내로 입력해주세요.');
        return false;
      }
      return true;
    };

    const validateReceiptNumber = () => {
      if (receiptRequested) {
        if (!receiptNumber.trim()) {
          alert('현금 영수증 번호를 입력해주세요.');
          return false;
        }
        if (isNaN(Number(receiptNumber))) {
          alert('현금 영수증 번호를 숫자만 입력해주세요.');
          return false;
        }
      }
      return true;
    };

    if (validateMessage() && validateReceiptNumber()) {
      alert('결제가 완료되었습니다.');
    }
  };

  const validateReceiptRequestChange = () => {
    setReceiptRequested(!receiptRequested);
  };

  if (loading || !productDetail) {
    return <Box>Loading...</Box>;
  }

  return (
    <Flex justifyContent="space-between" p={20} height="100vh">
      <Divider my={4} orientation="vertical" borderColor="gray.300" />
      <Box flex="3">
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Text fontSize="lg" fontWeight="bold">
            나에게 주는 선물
          </Text>
          <Box width="100%" p={30}>
            <Input
              type="text"
              placeholder="선물과 함께 보낼 메시지를 적어보세요"
              mt={4}
              bgColor="#EDF2F7"
              height="100px"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Box>
        </Flex>
        <Divider my={1} borderWidth="5px" borderColor="gray.300" width="800px" />
        <Flex direction="column" padding={16}>
          <Text fontSize="lg" fontWeight="bold">
            선물내역
          </Text>
          <Flex mt={16} border="2px" borderColor="gray.200" borderRadius="8px" p={5}>
            <Image src={productDetail.imageURL} alt={productDetail.name} boxSize="100px" />
            <Flex direction="column" ml="8px">
              <Text color="gray.300" fontSize="lg">
                {productDetail.brandInfo.name}
              </Text>
              <Text mb={4} fontSize="lg">
                {productDetail.name}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Divider my={4} orientation="vertical" borderColor="gray.300" />
      <Box flex="2" p={16}>
        <Text fontSize="xl" fontWeight="bold" py={5}>
          결제 정보
        </Text>
        <Divider my={1} borderColor="gray.300" />
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          p={4}
          mb={4}
        >
          <FormControl display="flex" alignItems="center">
            <Checkbox mr={4} onChange={validateReceiptRequestChange} isChecked={receiptRequested} />
            <FormLabel mb={0}>현금 영수증 신청</FormLabel>
          </FormControl>

          <FormControl display="flex" alignItems="center" mt={4}>
            <Select>
              <option value="personal">개인소득공제</option>
              <option value="business">사업자증빙용</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <Input
              id="receiptNumber"
              type="text"
              placeholder="(-없이) 숫자만 입력해주세요."
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
            />
          </FormControl>
        </Flex>
        <Divider my={4} borderColor="gray.300" />
        <Flex justifyContent="space-between" alignItems="center" p={3}>
          <Text fontSize="lg" fontWeight="bold">
            최종 결제 금액
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {state}원
          </Text>
        </Flex>
        <Divider my={4} borderColor="gray.300" />
        <Button
          bgColor="#FEE500"
          mt={4}
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
