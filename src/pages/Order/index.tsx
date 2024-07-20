import {
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  Flex,
  HStack,
  Image,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form'; // react-hook-form import 추가
import { useLocation } from 'react-router-dom';

interface FormValues {
  message: string;
  receiptNumber?: string;
  receiptRequested: boolean;
  receiptType?: string;
}

export const Order = () => {
  const location = useLocation();
  const { productDetail, quantity, price } = location.state || {};

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const receiptRequested = watch('receiptRequested');

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.message && !data.receiptRequested) {
      window.alert('주문이 완료되었습니다.');
    } else if (data.message && data.receiptRequested && data.receiptNumber) {
      window.alert('주문이 완료되었습니다.');
    }

    console.log('Order Data:', data);
  };

  return (
    <div>
      <ChakraProvider>
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Box p={4} width={800} ml={200} mt={20}>
            <Text fontSize="xl" mb={4} align={'center'} fontWeight={700}>
              나에게 주는 선물
            </Text>

            <Textarea
              placeholder="선물과 함께 보낼 메시지를 적어보세요"
              size="lg"
              mb={3}
              height={100}
              {...register('message', {
                required: '카드 메세지를 입력해주세요.',
                maxLength: { value: 100, message: '카드 메시지는 100자 이내로 입력해주세요.' },
              })}
            />
            {errors.message && <Text color={'red'}>{errors.message?.message}</Text>}

            <Text fontSize="xl" mb={4} mt={10}>
              선물내역
            </Text>
            <Box p={4} borderWidth="1px" borderRadius="lg" mb={8}>
              <HStack>
                <Image boxSize="100px" src={productDetail.imageURL} alt="상품 이미지" />
                <VStack align="start">
                  <Text fontSize="md" fontWeight="bold">
                    {productDetail?.brandInfo.name}
                  </Text>
                  <Text>
                    {productDetail?.name} X {quantity}개
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Box>
          <Box p={4} width={400}>
            <Text fontSize="xl" mb={4} mt={20} fontWeight={700}>
              결제 정보
            </Text>
            <VStack align="start" mb={4}>
              <Checkbox mt={5} {...register('receiptRequested')}>
                현금영수증 신청
              </Checkbox>
              {receiptRequested && ( // 현금영수증 신청 시에만 출력
                <>
                  <Select {...register('receiptType')}>
                    <option value="개인소득공제">개인소득공제</option>
                    <option value="사업자증빙용">사업자증빙용</option>
                  </Select>
                  <Input
                    placeholder="(- 없이) 숫자만 입력해주세요."
                    {...register('receiptNumber', {
                      required: receiptRequested ? '현금영수증 번호를 입력해주세요.' : false,
                      pattern: {
                        value: /^\d+$/,
                        message: '현금영수증 번호는 숫자만 입력해주세요.',
                      },
                    })}
                  />
                  {errors.receiptNumber && (
                    <Text color={'red'}>{errors.receiptNumber?.message}</Text>
                  )}
                </>
              )}
            </VStack>

            <HStack justify="space-between" mb={4} mt={10}>
              <Text fontSize="xl">최종 결제금액</Text>
              <Text fontSize="xl">{price}원</Text>
            </HStack>

            <Button colorScheme="yellow" size="lg" width="100%" onClick={handleSubmit(onSubmit)}>
              {price}원 결제하기
            </Button>
          </Box>
        </Flex>
      </ChakraProvider>
    </div>
  );
};

export default Order;
