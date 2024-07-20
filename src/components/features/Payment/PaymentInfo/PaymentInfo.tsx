import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import type { giftMessageProps, productInfoProps } from '@/types';

export default function PaymentInfo({ productInfo, message }: productInfoProps & giftMessageProps) {
  const [receiptNumber, setReceiptNumber] = useState<string>('');
  const [isReceiptChecked, setIsReceiptChecked] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let errorMessage = '';

    if (message.trim() === '') {
      errorMessage = '메시지를 입력해 주세요.';
      console.log(message, errorMessage);
    } else if (message.trim().length > 100) {
      errorMessage = '100자 이내로 입력해 주세요.';
      console.log(message, errorMessage);
    } else if (isReceiptChecked && !receiptNumber.trim()) {
      errorMessage = '현금 영수증 번호를 입력해 주세요.';
    } else if (isReceiptChecked && !/^\d+$/.test(receiptNumber)) {
      errorMessage = '현금 영수증 번호는 숫자만 입력해주세요.';
    }

    if (errorMessage != '') {
      alert(errorMessage);
    } else {
      alert('주문이 완료되었습니다.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignContent="center"
      width="360px"
      height="904px"
      p="16px"
      borderLeftColor="rgb(226, 232, 240)"
      borderColor="rgb(226, 232, 240)"
      borderLeftWidth="1px"
      borderRightWidth="1px"
    >
      <Box
        height="68px"
        p="24px 0 20px"
        borderBottom="0.1px"
        borderBottomColor="rgb(226, 232, 240)"
      >
        <Text fontSize="18px" fontWeight={700}>
          결제 정보
        </Text>
      </Box>
      <Box p="16px" borderBottom="0.1px" height="163px" borderBottomColor="rgb(226, 232, 240)">
        <FormControl mb={2}>
          <Box display="flex" alignItems="center">
            <Checkbox
              mr={2}
              isChecked={isReceiptChecked}
              onChange={() => setIsReceiptChecked(!isReceiptChecked)}
            />
            <FormLabel mb="0" fontSize="15px" fontWeight={700}>
              현금영수증 신청
            </FormLabel>
          </Box>
        </FormControl>
        <Select height="40px" mb={2}>
          <option value="personal">개인소득공제</option>
          <option value="business">사업자 지출증빙</option>
        </Select>
        <Input
          height="40px"
          placeholder="(-없이) 숫자만 입력해주세요."
          value={receiptNumber}
          onChange={(e) => setReceiptNumber(e.target.value)}
          mb={2}
          p="0 16px"
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        p="16px"
        borderBottom="0.1px"
        borderBottomColor="rgb(226, 232, 240)"
      >
        <Text fontSize="15px" fontWeight={700} mb={2}>
          최종 결제금액
        </Text>
        <Text fontSize="18px" fontWeight={700} mb={2}>
          {(productInfo?.price ?? 0) * (productInfo?.amount ?? 1)}
        </Text>
      </Box>
      <Box height="32px"></Box>
      <Button
        onClick={handleSubmit}
        display="flex"
        bgColor="rgb(254, 229, 0)"
        borderRadius="4px"
        fontSize="16px"
        height="60px"
      >
        {(productInfo?.price ?? 0) * (productInfo?.amount ?? 1)}원 결제하기
      </Button>
    </Box>
  );
}
