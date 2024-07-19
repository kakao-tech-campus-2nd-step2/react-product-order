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
import type { FieldError } from 'react-hook-form';
import { useForm } from 'react-hook-form'; // react-hook-form import 추가
import { useLocation } from 'react-router-dom';

export const Order = () => {
  const location = useLocation();
  const { productDetail, quantity, price } = location.state || {};

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // useForm 훅을 사용하여 폼 상태와 메소드 초기화

  // ref 대신 register 함수 사용
  const messageRef = register('message', {
    required: '카드 메시지를 입력해주세요.',
    maxLength: { value: 100, message: '카드 메시지는 100자 이내로 입력해주세요.' },
  });
  const receiptNumberRef = register('receiptNumber', {
    required: '현금영수증 번호를 입력해주세요.',
    pattern: { value: /^\d+$/, message: '현금영수증 번호는 숫자만 입력해주세요.' },
  });

  const onSubmit = (data: Record<string, null>) => {
    if (data.message && !watch('receiptRequested')) {
      window.alert('주문이 완료되었습니다.');
    } else if (data.message && watch('receiptRequested') && !errors.receiptNumber) {
      window.alert('주문이 완료되었습니다.');
    }

    console.log('Order Data:', data);
    console.log(data.message, watch('receiptRequested'), !errors.reciptNumber);
  };

  return (
    <div>
      <ChakraProvider>
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Box p={4} width={800} ml={200} mt={20}>
            <Text fontSize="xl" mb={4} align={'center'} fontWeight={700}>
              나에게 주는 선물
            </Text>
            {/* register 함수로 Input 요소를 등록 */}
            <Textarea
              placeholder="선물과 함께 보낼 메시지를 적어보세요"
              size="lg"
              mb={3}
              height={100}
              {...messageRef}
            />
            {errors.message && <Text color={'red'}>{(errors.message as FieldError)?.message}</Text>}

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
              {watch('receiptRequested') && ( // 현금영수증 신청 시에만 출력
                <>
                  <Select {...register('receiptType')}>
                    <option value="개인소득공제">개인소득공제</option>
                    <option value="사업자증빙용">사업자증빙용</option>
                  </Select>
                  <Input placeholder="(- 없이) 숫자만 입력해주세요." {...receiptNumberRef} />
                  {errors.receiptNumber && (
                    <Text color={'red'}>{(errors.receiptNumber as FieldError)?.message}</Text>
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
