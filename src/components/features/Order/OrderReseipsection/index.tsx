import { Box, Checkbox, Flex, Input, Select, Text } from '@chakra-ui/react';
import type { UseFormRegister } from 'react-hook-form';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { Button } from '@/components/common/Button';
import type { OrderFormValues } from '@/pages/Order';

interface OrderReseipSectionProps {
  productId: string;
  count: number;
  register: UseFormRegister<OrderFormValues>;
}
const OrderReseipSection = ({ productId, count, register }: OrderReseipSectionProps) => {
  const { data, isPending, error } = useGetProductDetail(productId);

  if (isPending) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  const {
    price: { basicPrice },
  } = data.detail;

  const totalPrice = basicPrice * count;

  return (
    <Box minW={'280px'}>
      <Text>주문자 정보</Text>
      <Checkbox {...register('hasCashReceipt')}>현금영수증 신청</Checkbox>

      <Select placeholder="" defaultValue={0} {...register('cashReceiptType')}>
        <option value="PERSONAL">개인소득공재</option>
        <option value="BUSINESS">사업자증빙용</option>
      </Select>
      <Input
        type="tel"
        placeholder="(-없이) 숫자만 입력해주세요."
        {...register('cashReceiptNumber')}
      />

      <Flex justifyContent={'space-between'}>
        <Text>최종 결제 금액</Text>
        <Text>{totalPrice}원</Text>
      </Flex>

      <Button theme="kakao" type="submit">
        {totalPrice}원 결제하기
      </Button>
    </Box>
  );
};

export default OrderReseipSection;
