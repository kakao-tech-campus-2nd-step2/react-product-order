import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Input, Button, Text, Checkbox, Box, Textarea, HStack, Select, Image, Divider, Flex, Center } from '@chakra-ui/react';
import { fetchInstance } from '@/api/instance';

const CheckoutPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [receipt, setReceipt] = useState('');
  const [receiptEnabled, setReceiptEnabled] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetchInstance.get(`/v1/products/${productId}/detail`);
        if (response.status === 200) {
          setProduct(response.data.detail);
          const state = location.state as { quantity: number };
          if (state && state.quantity) {
            setQuantity(state.quantity);
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to fetch product detail:', error);
        navigate('/');
      }
    };

    fetchProductDetail();
  }, [productId, navigate, location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      alert('메시지를 입력하세요');
      return;
    }

    if (message.length > 100) {
      alert('메시지는 100자 이내로 입력하세요');
      return;
    }

    if (receiptEnabled && !/^\d+$/.test(receipt)) {
      alert('현금 영수증 번호는 숫자만 입력하세요');
      return;
    }

    try {
      alert('주문이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('결제 실패:', error);
      alert('결제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Flex p="20px" direction="row" justifyContent="space-between">
      <Box width="70%">
        <Center>
          <Text fontSize="2xl" fontWeight="bold" mb="4">나에게 주는 선물</Text>
        </Center>
        <Center>
          <Textarea
            placeholder="선물과 함께 보낼 메시지를 적어보세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            mb="4"
          />
        </Center>
        <Divider mb="4" />
        <Text fontSize="2xl" fontWeight="bold" mb="4">선물내역</Text>
        {product && (
          <Box display="flex" alignItems="center" mb="4">
            <Image
              src={product.imageURL}
              alt={product.name}
              boxSize="100px"
              objectFit="cover"
              mr="4"
            />
            <Box>
              <Text>{product.name}</Text>
              <Text>x{quantity}</Text>
            </Box>
          </Box>
        )}
      </Box>
      <Box width="30%">
        <Text fontSize="2xl" fontWeight="bold" mb="4">결제 정보</Text>
        <Checkbox
          isChecked={receiptEnabled}
          onChange={(e) => setReceiptEnabled(e.target.checked)}
          mb="4"
        >
          현금영수증 신청
        </Checkbox>
        <Box mb="4">
          <Select>
            <option value="personal">개인소득공제</option>
            <option value="business">사업자지출증빙</option>
          </Select>
          <Input
            placeholder="(-없이) 숫자만 입력해주세요."
            value={receipt}
            onChange={(e) => setReceipt(e.target.value)}
            mt="2"
          />
        </Box>
        <HStack justifyContent="space-between" mb="4">
          <Text fontSize="xl">최종 결제금액</Text>
          <Text fontSize="2xl" fontWeight="bold">{product ? `${product.price.sellingPrice * quantity}원` : '0원'}</Text>
        </HStack>
        <Button
          bg="yellow"
          color="black"
          width="100%"
          onClick={handleSubmit}
        >
          {product ? `${product.price.sellingPrice * quantity}원 결제하기` : '결제하기'}
        </Button>
      </Box>
    </Flex>
  );
};

export default CheckoutPage;
