import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

interface FormValues {
  message: string;
  cashReceipt: boolean;
  cashReceiptNumber: string;
}

const PaymentPage = () => {
  const location = useLocation();
  const { product, quantity, totalPrice } = location.state;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    if (data.cashReceipt && !data.cashReceiptNumber) {
      alert('현금영수증 번호를 입력해주세요!');
      return;
    }
    if (!data.message) {
      alert('카드 메시지를 입력해주세요!');
      return;
    }
    if (data.message.length > 100) {
      alert('카드 메시지는 100자 이내로 입력해주세요!');
      return;
    }
    if (data.cashReceiptNumber && !/^\d*$/.test(data.cashReceiptNumber)) {
      alert('현금 영수증 번호는 숫자만 입력해주세요!');
      return;
    }
    alert('주문이 완료되었습니다.');
  };

  return (
    <Box>
      <Box
        as="header"
        padding="20px"
        borderBottom="1px solid #ddd"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      ></Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex p={5} align="center" justify="center">
          <Box flex="1" p={5} borderWidth="1px" borderRadius="lg" boxShadow="lg">
            <VStack spacing={4} align="stretch">
              <Text fontSize="2xl" fontWeight="bold" marginBottom="20px">
                나에게 주는 선물
              </Text>
              <Textarea
                placeholder="선물과 함께 보낼 메시지를 적어보세요"
                marginBottom="20px"
                {...register('message', {
                  required: '카드 메시지를 입력해주세요!',
                  maxLength: {
                    value: 100,
                    message: '카드 메시지는 100자 이내로 입력해주세요!',
                  },
                })}
              />
              {errors.message && <Text color="red.500">{errors.message.message}</Text>}
              <Text fontSize="xl" fontWeight="bold">
                선물내역
              </Text>
              <Flex align="center">
                <Image boxSize="100px" src={product.detail.imageURL} alt={product.detail.name} />
                <VStack align="start" pl={4}>
                  <Text fontWeight="bold">{product.detail.brandInfo.name}</Text>
                  <Text>{product.detail.name}</Text>
                  <Text>
                    {product.detail.price.sellingPrice.toLocaleString()}원 x {quantity}개
                  </Text>
                </VStack>
              </Flex>
            </VStack>
          </Box>
          <Box flex="1" p={5}>
            <VStack spacing={4} align="stretch">
              <Text fontSize="xl" fontWeight="bold">
                결제 정보
              </Text>
              <Controller
                name="cashReceipt"
                control={control}
                render={({ field }) => (
                  <Checkbox isChecked={field.value} onChange={field.onChange}>
                    현금영수증 신청
                  </Checkbox>
                )}
              />
              <Select placeholder="개인소득공제" marginBottom="20px">
                <option value="business">사업자 지출증빙</option>
              </Select>
              <Input
                placeholder="(-없이) 숫자만 입력해주세요."
                marginBottom="20px"
                {...register('cashReceiptNumber', {
                  pattern: {
                    value: /^\d*$/,
                    message: '현금 영수증 번호는 숫자만 입력해주세요!',
                  },
                })}
              />
              {errors.cashReceiptNumber && (
                <Text color="red.500">{errors.cashReceiptNumber.message}</Text>
              )}
              <Text fontSize="2xl" fontWeight="semibold">
                최종 결제금액
              </Text>
              <Text fontSize="2xl">{totalPrice.toLocaleString()}원</Text>
              <Button colorScheme="yellow" size="lg" width="full" type="submit">
                결제하기
              </Button>
            </VStack>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};

export default PaymentPage;
