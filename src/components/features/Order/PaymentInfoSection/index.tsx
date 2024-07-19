import { Button, Checkbox, Divider, HStack, Input, Select, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  handleOrder: (cashReceipt: boolean, receiptNumber: string) => void;
  totalPrice: number;
}

export const PaymentInfoSection = ({ handleOrder, totalPrice }: Props) => {
  const [cashReceipt, setCashReceipt] = useState(false);
  const [receiptType, setReceiptType] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');

  const onOrderClick = () => {
    handleOrder(cashReceipt, receiptNumber);
  };

  return (
    <VStack p={4} spacing={4} align="stretch">
      <Text fontSize="lg" as="b">
        결제 정보
      </Text>
      <Divider />
      <Checkbox
        fontSize="sm"
        as="b"
        isChecked={cashReceipt}
        onChange={(e) => setCashReceipt(e.target.checked)}
      >
        현금영수증 신청
      </Checkbox>
      <Select
        value={receiptType}
        onChange={(e) => setReceiptType(e.target.value)}
        isDisabled={!cashReceipt}
      >
        <option value="personal">개인소득공제</option>
        <option value="company">사업자증빙용</option>
      </Select>
      <Input
        placeholder="(-없이) 숫자만 입력해주세요."
        value={receiptNumber}
        onChange={(e) => setReceiptNumber(e.target.value)}
        isDisabled={!cashReceipt}
      />
      <Divider />
      <HStack justify="space-between" w="full">
        <Text fontSize="sm" as="b">
          최종 결제금액
        </Text>
        <Text fontSize="sm" as="b">
          {totalPrice}원
        </Text>
      </HStack>
      <Divider />
      <Button colorScheme="yellow" py={2} w="full" onClick={onOrderClick}>
        {totalPrice}원 결제하기
      </Button>
    </VStack>
  );
};
