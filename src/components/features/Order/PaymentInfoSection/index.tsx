import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

type PaymentInfoProps = {
  price: number;
  onPaymentClick: () => void;
};

export const PaymentInfoSection = ({ price, onPaymentClick }: PaymentInfoProps) => {
  const [isCashReceipt, setIsCashReceipt] = useState(false);
  const cashReceiptNumberRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCashReceipt(event.target.checked);
  };

  const handlePaymentClick = () => {
    const cashReceiptNumber = cashReceiptNumberRef.current?.value || '';

    if (isCashReceipt) {
      if (!cashReceiptNumber) {
        alert('현금영수증 번호를 입력해주세요.');
        return;
      }
      if (!/^\d*$/.test(cashReceiptNumber)) {
        alert('현금영수증 번호는 숫자만 입력할 수 있습니다.');
        return;
      }
    }
    onPaymentClick();
  };

  return (
    <Box
      w="100%"
      h="100%"
      borderLeft="1px solid rgb(237, 237, 237)"
      borderRight="1px solid rgb(237, 237, 237)"
      padding="16px"
    >
      <Heading as="h6" padding="24px 0px 20px">
        <Text
          fontSize="18px"
          lineHeight="21px"
          color="rgb(34, 34, 34)"
          boxSizing="border-box"
          fontWeight={700}
        >
          결제 정보
        </Text>
      </Heading>
      <Divider opacity={0.6} borderWidth="0px 0px 1px" w="100%" color="rgb(237, 237, 237)" />
      <Box w="100%" padding="16px">
        <Checkbox
          cursor="pointer"
          display="inline-flex"
          alignItems="center"
          position="relative"
          onChange={handleCheckboxChange}
        >
          현금영수증 신청
        </Checkbox>
        <Box w="100%" h="16px" />
        <Select w="100%" pb="1px">
          <option value="PERSONAL">개인소득공제</option>
          <option value="BUSINESS">사업자증빙용</option>
        </Select>
        <Box w="100%" h="8px" />
        <Input
          ref={cashReceiptNumberRef}
          name="cashReceiptNumber"
          placeholder="(-없이) 숫자만 입력해주세요."
          w="100%"
          outlineOffset="2px"
          position="relative"
        />
      </Box>
      <Divider opacity={0.6} borderWidth="0px 0px 1px" color="rgb(237, 237, 237)" />
      <Flex padding="16px" w="100%" justifyContent="space-between" alignItems="center">
        <Text fontSize="15px" lineHeight="24px" fontWeight={700}>
          최종 결제금액
        </Text>
        <Text fontSize="18px" lineHeight="21px" fontWeight={700} color="rgb(34, 34, 34)">
          {price}원
        </Text>
      </Flex>
      <Divider opacity={0.6} borderWidth="0px 0px 1px" color="rgb(237, 237, 237)" />
      <Box w="100%" h="32px" />
      <Button
        h="60px"
        fontSize="16px"
        w="100%"
        borderRadius="4px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        color="rgb(17, 17, 17)"
        backgroundColor="rgb(254, 229, 0)"
        boxSizing="border-box"
        onClick={handlePaymentClick}
      >
        {price}원 결제하기
      </Button>
    </Box>
  );
};
