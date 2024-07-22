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

import type { productInfoProps } from '@/types';

export default function PaymentInfo({ productInfo }: productInfoProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="start"
      width="360px"
      height="904px"
      borderLeftColor="rgb(226, 232, 240)"
      borderColor="rgb(226, 232, 240)"
      borderLeftWidth="1px"
      borderRightWidth="1px"
    >
      <Text
        p="24px 0 20px"
        fontSize="16px"
        borderBottom="1px"
        borderBottomColor="rgb(226, 232, 240)"
      >
        결제 정보
      </Text>
      <Box
        p="16px"
        borderBottom="1px"
        width="326px"
        height="163px"
        borderBottomColor="rgb(226, 232, 240)"
      >
        <FormControl mb={2}>
          <Box display="flex" alignItems="center">
            <Checkbox mr={2} />
            <FormLabel mb="0" fontSize="15px" fontWeight={700}>
              현금영수증 신청
            </FormLabel>
          </Box>
        </FormControl>
        <Select width="294px" height="40px" placeholder="개인소득공제" mb={2} p="0 32px 0 16px">
          <option value="personal">개인소득공제</option>
          <option value="business">사업자 지출증빙</option>
        </Select>
        <Input
          width="294px"
          height="40px"
          placeholder="(-없이) 숫자만 입력해주세요."
          mb={2}
          p="0 16px"
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        p="16px"
        borderBottom="1px"
        borderBottomColor="rgb(226, 232, 240)"
      >
        <Text fontSize="15px" fontWeight={700} mb={2}>
          최종 결제금액
        </Text>
        <Text fontSize="18px" fontWeight={700} mb={2}>
          {productInfo.price * (productInfo.amount ?? 1)}
        </Text>
      </Box>
      <Box height="32px"></Box>
      <Button
        display="flex"
        bgColor="rgb(254, 229, 0)"
        borderRadius="4px"
        fontSize="16px"
        height="60px"
        width="326px"
      >
        {productInfo.price * (productInfo.amount ?? 1)}원 결제하기
      </Button>
    </Box>
  );
}
