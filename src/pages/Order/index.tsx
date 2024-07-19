import { Box, Button, Checkbox, HStack, Image, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { Header } from '@/components/features/Layout/Header';

interface OrderFormData {
  message: string;
  isCashReceipt: boolean;
  cashReceiptNumber?: string;
}

const OrderPage = () => {
  const location = useLocation();
  const { product, quantity } = location.state || {};

  const { register, handleSubmit, watch, formState: { errors } } = useForm<OrderFormData>();

  const isCashReceipt = watch("isCashReceipt", false);
  const onSubmit = (_data: OrderFormData) => {
    alert('주문이 완료되었습니다.');
  };

  if (!product || !quantity) {
    return <Text>잘못된 접근입니다.</Text>;
  }

  const totalPrice = product.price.sellingPrice * quantity;

  return (
    <Box p={5}>
      <Box position="fixed" top="0" left="0" width="100%" zIndex="1000">
        <Header />
      </Box>
      <Text fontSize="2xl" fontWeight="bold">선물하기</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mt={5} borderWidth="1px" borderRadius="lg" p={5}>
          <Text fontSize="xl" fontWeight="bold">나에게 주는 선물</Text>
          <Textarea 
            mt={3} 
            placeholder="선물과 함께 보낼 메시지를 적어보세요" 
            {...register("message", {
              required: "메시지를 입력해주세요.",
              maxLength: { value: 100, message: "카드 메시지는 100자 이내로 입력해주세요." }
            })}
          />
          {errors.message && <Text color="red.500">{errors.message.message}</Text>}

          <Box mt={5}>
            <Text fontSize="xl" fontWeight="bold">선물내역</Text>
            <HStack mt={3} spacing={5}>
              <Image src={product.imageURL} alt={product.name} boxSize="100px" />
              <VStack align="start">
                <Text>{product.brandInfo.name}</Text>
                <Text>{product.name} x {quantity}개</Text>
              </VStack>
            </HStack>
          </Box>
        </Box>

        <Box mt={5} borderWidth="1px" borderRadius="lg" p={5}>
          <Text fontSize="xl" fontWeight="bold">결제 정보</Text>
          <Checkbox mt={3} {...register("isCashReceipt")}>
            현금영수증 신청
          </Checkbox>
          {isCashReceipt && (
            <>
              <Select mt={3} placeholder="개인소득공제">
                <option value="business">사업자증빙용</option>
              </Select>
              <Input 
                mt={3} 
                placeholder="(-없이) 숫자만 입력해주세요." 
                {...register("cashReceiptNumber", {
                  required: isCashReceipt ? "현금 영수증 번호를 입력해주세요." : false,
                  pattern: {
                    value: /^\d+$/,
                    message: "현금영수증 번호는 숫자로만 입력해주세요."
                  }
                })}
              />
              {errors.cashReceiptNumber && <Text color="red.500">{errors.cashReceiptNumber.message}</Text>}
            </>
          )}
          <Button
            mt={5}
            bg="yellow.400"
            color="black"
            width="full"
            _hover={{ bg: 'yellow.500' }}
            type="submit"
          >
            {totalPrice}원 결제하기
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default OrderPage;
