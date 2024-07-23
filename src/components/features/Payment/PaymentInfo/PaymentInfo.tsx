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
import type { FieldErrors } from 'react-hook-form';

import type { formProps, FormValues, productInfoProps } from '@/types';

export default function PaymentInfo({ productInfo, methods }: productInfoProps & formProps) {
  const onSubmit = () => {
    alert('주문이 완료되었습니다.');
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    if (errors.message?.type === 'required') {
      alert(errors.message.message);
    } else if (errors.message?.type === 'maxLength') {
      alert(errors.message.message);
    } else if (errors.isReceiptChecked?.type === 'required') {
      alert(errors.isReceiptChecked.message);
    } else if (errors.receiptNumber?.type === 'required') {
      alert(errors.receiptNumber.message);
    } else if (errors.receiptNumber?.type === 'pattern') {
      alert(errors.receiptNumber.message);
    }
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
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
                {...methods.register('isReceiptChecked', {
                  required: '현금 영수증 신청 여부를 선택해주세요.',
                })}
                mr={2}
              />
              <FormLabel mb="0" fontSize="15px" fontWeight={700}>
                현금영수증 신청
              </FormLabel>
            </Box>
          </FormControl>
          <Select height="40px" mb={2} {...methods.register('receiptType')}>
            <option value="personal">개인소득공제</option>
            <option value="business">사업자 지출증빙</option>
          </Select>
          <Input
            type="text"
            {...methods.register('receiptNumber', {
              required: '현금 영수증 번호는 필수입니다.',
              pattern: {
                value: /^\d+$/,
                message: '현금 영수증 번호는 숫자만 입력해주세요.',
              },
            })}
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
          type="submit"
          display="flex"
          bgColor="rgb(254, 229, 0)"
          borderRadius="4px"
          fontSize="16px"
          height="60px"
        >
          {(productInfo?.price ?? 0) * (productInfo?.amount ?? 1)}원 결제하기
        </Button>
      </Box>
    </form>
  );
}
