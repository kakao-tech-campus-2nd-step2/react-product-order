import { Box, Checkbox, Flex, Input, Select, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { usePostOrder } from '@/api/hooks/usePostOrder';
import { Button } from '@/components/common/Button';
import { orderLocalStorage } from '@/utils/storage';

interface OrderReseipSectionProps {
  productId: string;
  count: number;
  basicPrice: number;
  messageCardTextMessageRef: React.RefObject<HTMLInputElement>;
}
const OrderReseipSection = ({
  productId,
  basicPrice,
  count,
  messageCardTextMessageRef,
}: OrderReseipSectionProps) => {
  const { mutate, isSuccess } = usePostOrder();

  const [hasCashReceipt, setHasCashReceipt] = useState(false);

  const cashReceiptSelectRef = useRef<HTMLSelectElement>(null);
  const cashReceiptNumberRef = useRef<HTMLInputElement>(null);

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
    <Box minW={'280px'}>
      <Text>주문자 정보</Text>
      <Checkbox isChecked={hasCashReceipt} onChange={handleCashReceipt}>
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
  );
};

export default OrderReseipSection;
