import { Checkbox, HStack, Input, Select, Spacer, Text, VStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { CTAButton } from '@/components/common/Button/CTAButton';
import type { OrderFormData } from '@/pages/Order/OrderPage';

interface Props {
  totalPrice: number;
}

export const PaymentDetails = ({ totalPrice }: Props) => {
  const { register } = useFormContext<OrderFormData>();

  return (
    <VStack w="326px" h="100%" borderLeft="1px" borderColor="gray.200" p="16px">
      <Text fontSize="18px" fontWeight="bold" pb="30px">
        결제 정보
      </Text>

      <VStack w="100%" borderY="1px" borderColor="gray.200">
        <Checkbox w="100%" pt="12px" alignItems="center" {...register('checkedReceipt')}>
          현금영수증 신청
        </Checkbox>
        <Select w="100%" placeholder="개인소득공제">
          <option value="individual">사업자증빙용</option>
        </Select>
        <Input
          w="100%"
          type="text"
          placeholder="(-없이) 숫자만 입력해주세요."
          {...register('receiptNumber')}
        />
      </VStack>

      <HStack w="100%" borderY="1px" borderColor="gray.200">
        <Text p="16px" fontSize="15px" fontWeight="bold">
          최종 결제금액
        </Text>
        <Spacer />
        <Text fontSize="18px" fontWeight="bold">
          {totalPrice} 원
        </Text>
      </HStack>

      <CTAButton
        type="submit"
        text={`${totalPrice}원 결제하기`}
        textColor="black"
        background="yellow"
      />
    </VStack>
  );
};
