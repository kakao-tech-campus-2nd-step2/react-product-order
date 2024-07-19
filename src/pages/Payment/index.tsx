import { Box, Checkbox, Image, Input, Select, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { Button } from '@/components/common/Button';

const PaymentPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const {
    data: productDetailData,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useGetProductDetail(productId || '');

  const productDetail = productDetailData?.detail;

  const [message, setMessage] = useState('');
  const [receipt, setReceipt] = useState(false);
  const [receiptType, setReceiptType] = useState('personal');
  const [receiptNumber, setReceiptNumber] = useState('');

  if (isDetailLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="Loading"
        />
      </Box>
    );
  }

  if (isDetailError || !productDetail) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Text>상품 정보를 불러오는 데 실패했습니다.</Text>
      </Box>
    );
  }

  const handlePayment = () => {
    alert('주문이 완료되었습니다');
  };

  return (
    <Box display="flex" p={4} justifyContent="space-between" maxWidth="1200px" margin="0 auto">
      <Box flex="1" mr={4}>
        <Box mb={4}>
          <Text fontWeight="bold" mb={2} fontSize="xl">
            나에게 주는 선물
          </Text>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="선물과 함께 보낼 메세지를 적어보세요"
            size="lg"
            height="100px"
            bg="#F7FAFC"
            borderRadius="md"
          />
        </Box>
        <Box mb={4} borderWidth={1} p={4} borderRadius="md" bg="#fff" boxShadow="sm">
          <Text fontWeight="bold" mb={2} fontSize="lg">
            선물내역
          </Text>
          <Box display="flex" alignItems="center">
            <Image src={productDetail.imageURL} alt="상품 이미지" boxSize="100px" mr={4} />
            <Box>
              <Text fontWeight="bold">{productDetail.brandInfo.name}</Text>
              <Text>{productDetail.name}</Text>
              <Text>수량: 1</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box flex="1">
        <Box mb={4} p={4} borderWidth={1} borderRadius="md" bg="#fff" boxShadow="sm">
          <Text fontWeight="bold" mb={2} fontSize="lg">
            결제 정보
          </Text>
          <Checkbox isChecked={receipt} onChange={(e) => setReceipt(e.target.checked)} mb={2}>
            현금영수증 신청
          </Checkbox>
          {receipt && (
            <Box>
              <Select value={receiptType} onChange={(e) => setReceiptType(e.target.value)} mb={2}>
                <option value="personal">개인소득공제</option>
                <option value="business">사업자지출증빙</option>
              </Select>
              <Input
                value={receiptNumber}
                onChange={(e) => setReceiptNumber(e.target.value)}
                placeholder="(-없이) 숫자만 입력하세요."
                mb={2}
              />
            </Box>
          )}
          <Box mt={4}>
            <Text fontWeight="bold" fontSize="lg">
              최종 결제금액
            </Text>
            <Text fontSize="2xl" color="yellow.600" fontWeight="bold">
              {productDetail.price.sellingPrice.toLocaleString()}원
            </Text>
          </Box>
          <Button size="large" theme="kakao" onClick={handlePayment}>
            {productDetail.price.sellingPrice.toLocaleString()}원 결제하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentPage;
