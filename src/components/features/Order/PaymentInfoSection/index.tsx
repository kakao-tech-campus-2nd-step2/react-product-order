import { Button, Checkbox, Divider, HStack, Input, Select, Text, VStack } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props {
  totalPrice: number;
}

export const PaymentInfoSection = ({ totalPrice }: Props) => {
  const { control, watch } = useFormContext();
  const cashReceipt = watch('cashReceipt');

  return (
    <VStack p={4} spacing={4} align="stretch">
      <Text fontSize="lg" as="b">
        결제 정보
      </Text>
      <Divider />
      <Controller
        name="cashReceipt"
        control={control}
        render={({ field }) => (
          <Checkbox fontSize="sm" as="b" isChecked={field.value} {...field}>
            현금영수증 신청
          </Checkbox>
        )}
      />
      <Controller
        name="receiptType"
        control={control}
        render={({ field }) => (
          <Select {...field} isDisabled={!cashReceipt}>
            <option value="personal">개인소득공제</option>
            <option value="company">사업자증빙용</option>
          </Select>
        )}
      />
      <Controller
        name="receiptNumber"
        control={control}
        render={({ field }) => (
          <Input placeholder="(-없이) 숫자만 입력해주세요." {...field} isDisabled={!cashReceipt} />
        )}
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
      <Button colorScheme="yellow" py={2} w="full" type="submit">
        {totalPrice}원 결제하기
      </Button>
    </VStack>
  );
};
