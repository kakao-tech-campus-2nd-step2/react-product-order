import { Box, Button, Checkbox,Input, Text } from '@chakra-ui/react';
import { Controller,useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface FormValues {
  cardMessage: string;
  cashReceipt: boolean;
  cashReceiptNumber?: string;
}

const CheckoutPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { handleSubmit, control, formState: { errors }, watch } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(`Product ${productId} has been purchased with message: ${data.cardMessage}`);
  };

  const isCashReceiptChecked = watch('cashReceipt');

  return (
    <Box p="6">
      <Text fontWeight="bold" as="h1" fontSize="2xl">결제 페이지</Text>
      <Text>상품 ID: {productId}</Text>

      <Box as="form" onSubmit={handleSubmit(onSubmit)} mt="4">
        <Text>카드 메시지</Text>
        <Controller
          name="cardMessage"
          control={control}
          defaultValue=""
          rules={{
            required: '카드 메시지를 입력하세요.',
            maxLength: { value: 100, message: '카드 메시지는 100자 이내로 입력하세요.' }
          }}
          render={({ field }) => <Input {...field} placeholder="카드 메시지를 입력하세요" />}
        />
        {errors.cardMessage && <Text color="red">{errors.cardMessage.message}</Text>}

        <Controller
          name="cashReceipt"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox
              isChecked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              mt="4"
            >
              현금 영수증 신청
            </Checkbox>
          )}
        />
        
        {isCashReceiptChecked && (
          <Controller
            name="cashReceiptNumber"
            control={control}
            defaultValue=""
            rules={{
              validate: value => {
                const val = value || ''; // undefined를 빈 문자열로 처리
                return (val === '' || /^\d+$/.test(val)) || '현금영수증 번호는 숫자만 입력하세요.';
              }
            }}
            render={({ field }) => (
              <Input
                {...field}
                mt="2"
                placeholder="현금 영수증 번호를 입력하세요"
              />
            )}
          />
        )}
        {errors.cashReceiptNumber && <Text color="red">{errors.cashReceiptNumber.message}</Text>}

        <Button colorScheme="teal" mt="4" type="submit">결제하기</Button>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
