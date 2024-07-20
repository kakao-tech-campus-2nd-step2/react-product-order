import { Box, Checkbox, Input, Text, VStack } from '@chakra-ui/react';
import { Control, Controller, UseFormWatch } from 'react-hook-form';

type FormData = {
    message: string;
    isReceiptRequested: boolean;
    receiptNumber: string;
  };
  
type Props = {
  price: number;
  control: Control<FormData>;
  watch: UseFormWatch<FormData>;
};

const PaymentInfo = ({ price, control, watch }: Props) => {
  const isReceiptRequested = watch('isReceiptRequested');

  return (
    <Box>
      <Text fontSize="lg" mb={2}>결제 정보</Text>
      <VStack align="start" spacing={4}>
        <Controller
          name="isReceiptRequested"
          control={control}
          render={({ field }) => (
            <Checkbox
              isChecked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            >
              현금영수증 신청
            </Checkbox>
          )}
        />
        {isReceiptRequested && (
          <Controller
            name="receiptNumber"
            control={control}
            rules={{ pattern: /^\d+$/ }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="(-없이) 숫자만 입력해주세요."
              />
            )}
          />
        )}
      </VStack>
      <Text fontSize="xl" mt={4}>최종 결제금액: {price}원</Text>
    </Box>
  );
};

export default PaymentInfo;
