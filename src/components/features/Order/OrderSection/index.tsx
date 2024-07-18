import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { usePostOrder } from '@/api/hooks/usePostOrder';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/provider/Auth';
import { orderLocalStorage } from '@/utils/storage';

interface OrderSectionProps {
  count: number;
  productId: string;
}
const OrderSection = ({ count, productId }: OrderSectionProps) => {
  const { data, isLoading, error } = useGetProductDetail(productId);
  const { mutate, isSuccess } = usePostOrder();

  const [hasCashReceipt, setHasCashReceipt] = useState(false);

  const messageCardTextMessageRef = useRef<HTMLInputElement>(null);
  const cashReceiptSelectRef = useRef<HTMLSelectElement>(null);
  const cashReceiptNumberRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const authInfo = useAuth();
  if (!authInfo) {
    navigate('/');
    return <></>;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error || !data) {
    return <div>error...</div>;
  }

  const {
    imageURL,
    name,
    price: { basicPrice },
  } = data.detail;

  const handleCashReceipt = () => {
    setHasCashReceipt(!hasCashReceipt);
  };

  const totalPrice = basicPrice * count;

  const handleOrder = () => {
    const messageCardTextMessage = messageCardTextMessageRef.current?.value || '';
    const cashReceiptType = cashReceiptSelectRef.current?.value as 'PERSONAL' | 'BUSINESS';
    const cashReceiptNumber = cashReceiptNumberRef.current?.value || '';

    const orderRequestBody = {
      productId,
      productOptionId: 1,
      productQuantity: count,
      messageCardTemplateId: 1,
      messageCardTextMessage,
      senderId: 1,
      receiverId: 1,
      hasCashReceipt,
      cashReceiptType,
      cashReceiptNumber,
    };
    mutate(orderRequestBody);

    if (isSuccess) {
      alert('주문이 완료되었습니다.');
    }

    orderLocalStorage.remove();
  };

  return (
    <Flex display={'flex'} width={'100%'} gap={'16px'}>
      <Box width={'100%'}>
        <Flex direction="column" gap="1rem">
          <FormControl>
            <FormLabel>나에게 주는 선물</FormLabel>
            <Input
              type="email"
              placeholder="선물과 함께 보낼 메시지를 적어보세요"
              ref={messageCardTextMessageRef}
            />
          </FormControl>
          <Box width={'100%'} bg="white">
            <Text borderBottom={'1px solid'}>선물 내역</Text>
            <HStack>
              <Image src={imageURL} alt={name} />
              <Box>
                <Text>상품명</Text>
                <Text>이름 </Text>
              </Box>
            </HStack>
          </Box>
        </Flex>
      </Box>

      <Box minW={'280px'}>
        <Text>주문자 정보</Text>
        <Checkbox isChecked={hasCashReceipt} onClick={handleCashReceipt}>
          현금영수증 신청
        </Checkbox>

        <Select placeholder="" defaultValue={0} ref={cashReceiptSelectRef}>
          <option value="PERSONAL">개인소득공재</option>
          <option value="BUSINESS">사업자증빙용</option>
        </Select>
        <Input type="tel" placeholder="(-없이) 숫자만 입력해주세요." ref={cashReceiptNumberRef} />

        <Flex justifyContent={'space-between'}>
          <Text>최종 결제 금액</Text>
          <Text>{totalPrice}원</Text>
        </Flex>

        <Button theme="kakao" type="submit" onClick={handleOrder}>
          {totalPrice}원 결제하기
        </Button>
      </Box>
    </Flex>
  );
};

export default OrderSection;
