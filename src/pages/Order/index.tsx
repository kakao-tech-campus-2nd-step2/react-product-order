import { Box, Button, Checkbox, Flex, Image, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

interface FormValues {
  message: string;
  cashReceiptRequested: boolean;
  cashReceiptNumber: string;
}

export const OrderPage = () => {
  const location = useLocation();
  const { name, price, quantity, totalPrice, imageURL } = location.state || { name: '', price: 0, quantity: 0, totalPrice: 0, imageURL: '' };
  
  const {
    control,
    register,
    handleSubmit,
    watch
  } = useForm<FormValues>({
    defaultValues: {
      message: '',
      cashReceiptRequested: false,
      cashReceiptNumber: ''
    }
  });

  const onSubmit = (data: FormValues) => {
    if (!data.message) {
      alert('메세지를 입력해주세요');
      return;
    }
    if (data.message.length > 100) {
      alert('메시지는 100자 이내로 입력해주세요.');
      return;
    }
    if (data.cashReceiptRequested && !data.cashReceiptNumber) {
      alert('현금영수증 번호를 입력해주세요.');
      return;
    }
    alert('주문이 완료되었습니다.');
  };

  const cashReceiptRequested = watch("cashReceiptRequested");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex p={5} align="center" justify="center">
        <Box flex="1" p={5} borderWidth="1px" borderRadius="lg" boxShadow="lg">
          <VStack spacing={4} align="stretch">
            <Text fontSize="xl" fontWeight="bold">나에게 주는 선물</Text>
            <Textarea {...register("message")} placeholder="선물과 함께 보낼 메시지를 작성해주세요" />
            <Text fontSize="lg" fontWeight="bold">선물 내역</Text>
            <Flex align="center">
              <Image boxSize="100px" src={imageURL} alt={name} />
              <VStack align="start" pl={4}>
                <Text fontWeight="bold">{name}</Text>
                <Text>{price.toLocaleString()}원 x {quantity}개</Text>
              </VStack>
            </Flex>
          </VStack>
        </Box>
        <Box flex="1" p={5}>
          <VStack spacing={4} align="stretch">
            <Text fontSize="xl" fontWeight="bold">결제 정보</Text>
            <Controller
              name="cashReceiptRequested"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Checkbox
                  isChecked={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                >
                  현금영수증 신청
                </Checkbox>
              )}
            />
            {cashReceiptRequested && (
              <>
                <Select>
                  <option value="personal">개인소득공제</option>
                  <option value="business">사업자증빙용</option>
                </Select>
                <Input {...register("cashReceiptNumber", { pattern: /^\d+$/ })} placeholder="(- 없이) 숫자만 입력해주세요." />
              </>
            )}
            <Text fontSize="2xl" fontWeight="semibold">최종 결제금액</Text>
            <Text fontSize="2xl">{totalPrice.toLocaleString()}원</Text>
            <Button colorScheme="yellow" size="lg" width ="full" type="submit">결제하기</Button>
        </VStack>
        </Box>
    </Flex>
    </form>
    );
};
