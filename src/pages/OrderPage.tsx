import { useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Input,
  Checkbox,
  Select,
  Textarea,
  Text,
  Image,
  Flex,
} from '@chakra-ui/react';
import { Button } from '@/components/common/Button/index';
import { useGetGoodsDetail } from '@/api/hooks/useGetGoodsDetail';
import { placeOrder } from '@/api/hooks/useOrder';
import { Spinner } from '@/components/common/Spinner';
import { getDynamicPath } from '@/routes/path';
import type { ProductOrderRequestBody } from '@/types';

import TextView from '@/styles/styles';

const OrderPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const quantity = (location.state as { quantity: number }).quantity || 1;
  if (!productId) {
    return <TextView>유효하지 않은 상품 ID입니다.</TextView>;
  }
  const { data: productDetail, isLoading, isError } = useGetGoodsDetail(Number(productId));

  const messageRef = useRef<HTMLTextAreaElement>(null);
  const receiptCheckboxRef = useRef<HTMLInputElement>(null);
  const receiptTypeRef = useRef<HTMLSelectElement>(null);
  const receiptNumberRef = useRef<HTMLInputElement>(null);

  const handleOrderClick = async () => {
    const message = messageRef.current?.value || '';

    if (message.trim() === '') {
      alert('메시지를 입력해주세요');
      return;
    }

    if (receiptCheckboxRef.current?.checked && !receiptNumberRef.current?.value.trim()) {
      alert('현금영수증 번호를 입력해주세요.');
      return;
    }

    try {
      const orderData: ProductOrderRequestBody = {
        productId: Number(productId),
        productOptionId: 0,
        productQuantity: quantity,
        messageCardTemplateId: 0,
        messageCardTextMessage: message,
        senderId: 0,
        receiverId: 0,
        hasCashReceipt: receiptCheckboxRef.current?.checked || false,
        cashReceiptType: receiptTypeRef.current?.value as 'PERSONAL' | 'BUSINESS',
        cashReceiptNumber: receiptNumberRef.current?.value || '',
      };

      await placeOrder(orderData);
      alert('주문이 완료되었습니다.');
      navigate(getDynamicPath.order(productId));
    } catch (error) {
      console.error('주문 실패:', error);
      if (error instanceof Error) {
        alert(`주문에 실패했습니다. 오류: ${error.message}`);
      } else {
        alert('주문에 실패했습니다. 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  if (isLoading) {
    return (
      <TextView>
        <Spinner />
      </TextView>
    );
  }

  if (isError) {
    return <TextView>에러가 발생했습니다.</TextView>;
  }
  if (!productDetail) return <TextView>상품 정보를 불러올 수 없습니다.</TextView>;

  const totalAmount = productDetail.detail.price.sellingPrice * quantity;

  return (
    <Flex w="100vw">
      <Container w="70%">
        <Flex p="44px 0px 32px" flexDirection="column">
          <Text as="span" fontSize="18px" fontWeight="bold" textAlign="center">
            나에게 주는 선물
          </Text>
          <Textarea
            ref={messageRef}
            placeholder="선물과 함께 보낼 메시지를 적어보세요"
            p="8px 16px 8px"
            m="26px 60px 30px"
            backgroundColor="#EDF2F7"
            h="100px"
          />
        </Flex>
        <Box backgroundColor="#EDEDED" h="8px" w="100%" />
        <Box p="16px">
          <Text fontWeight="bold" fontSize="15px" lineHeight="24px">
            선물내역
          </Text>
          <Box
            p="20px 16px 16px"
            display="flex"
            border="1px solid rgb(237, 237, 237)"
            borderRadius="8px"
            mt="16px"
          >
            <Image
              src={productDetail.detail.imageURL}
              boxSize="86"
              alt={productDetail.detail.name}
            />
            <Box pl="8px">
              <Text fontSize="13px" color="#888">
                {productDetail.detail.brandInfo.name}
              </Text>
              <Text fontSize="14px" lineHeight="18px" pt="3px">
                {productDetail.detail.name}
              </Text>
            </Box>
          </Box>
        </Box>
      </Container>
      <Container
        p="16px"
        borderLeft="1px solid rgb(237, 237, 237)"
        borderRight="1px solid rgb(237, 237, 237)"
        w="30%"
      >
        <Text
          as="h6"
          p="24px 0px 20px"
          fontWeight="bold"
          borderBottom="1px solid rgb(237, 237, 237)"
        >
          결제 정보
        </Text>
        <Box display="flex" flexDirection="column" p="16px">
          <Checkbox ref={receiptCheckboxRef} mb="16px" fontSize="15px" fontWeight="bold">
            현금영수증 신청
          </Checkbox>
          <Select
            ref={receiptTypeRef}
            p="0px 32px 1px 16px"
            w="100%"
            h="40px"
            border="1px solid rgb(237, 237, 237)"
          >
            <option value="PERSONAL">개인소득공제</option>
            <option value="BUSINESS">사업자증빙용</option>
          </Select>
          <Input
            ref={receiptNumberRef}
            placeholder="(-없이) 숫자만 입력해주세요."
            h="40px"
            mt="8px"
            p="0px 16px"
            border="1px solid rgb(237, 237, 237)"
            borderRadius="4px"
          />
        </Box>
        <Flex
          justifyContent="space-between"
          borderTop="1px solid rgb(237, 237, 237)"
          borderBottom="1px solid rgb(237, 237, 237)"
          p="16px"
          mb="3px"
        >
          <Text fontSize="16px" fontWeight="bold">
            최종 결제금액
          </Text>
          <Text fontSize="16px" fontWeight="bold">
            {totalAmount.toLocaleString()}원
          </Text>
        </Flex>
        <Button onClick={handleOrderClick}>{totalAmount.toLocaleString()}원 결제하기</Button>
      </Container>
    </Flex>
  );
};

export default OrderPage;
