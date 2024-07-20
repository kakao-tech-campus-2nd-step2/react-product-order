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
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { ProductDetail } from '@/api/hooks/useProductDetail';

export interface OrderLocationState {
  productDetail: ProductDetail;
  quantity: number;
  price: number;
}

export const Order = () => {
  const location = useLocation();
  // location.state가 정의되지 않은 경우 기본값을 설정합니다.
  const { productDetail, quantity, price } = (location.state || {
    productDetail: null,
    quantity: 0,
    price: 0,
  }) as OrderLocationState;

  // 상태로 관리할 필요가 없는 경우
  const [formState, setFormState] = useState({
    message: '',
    receiptRequested: false,
    receiptType: '',
    receiptNumber: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormState((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = [];

    if (!formState.message) {
      errors.push('메시지를 입력해주세요.');
      valid = false;
    } else if (formState.message.length > 100) {
      errors.push('메시지는 100자 이내로 입력해주세요.');
      valid = false;
    }

    if (formState.receiptRequested) {
      if (!formState.receiptNumber) {
        errors.push('현금영수증 번호를 입력해주세요.');
        valid = false;
      } else if (!/^\d+$/.test(formState.receiptNumber)) {
        errors.push('현금영수증 번호는 숫자만 입력해주세요.');
        valid = false;
      }
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
      valid = false; // 유효성 검사 실패시 폼 제출 방지
    }

    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const orderData = {
        message: formState.message,
        receiptRequested: formState.receiptRequested,
        receiptType: formState.receiptType,
        receiptNumber: formState.receiptNumber,
        productDetail,
        quantity,
        price,
      };
      console.log('Order Data:', orderData);

      window.alert('주문이 완료되었습니다.');
    }
  };

  return (
    <div>
      <ChakraProvider>
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Box p={4} width={800} ml={200} mt={20}>
            <Text fontSize="xl" mb={4} align={'center'} fontWeight={700}>
              나에게 주는 선물
            </Text>
            <Input
              as={Textarea}
              placeholder="선물과 함께 보낼 메시지를 적어보세요"
              size="lg"
              mb={8}
              height={100}
              name="message"
              value={formState.message}
              onChange={handleInputChange}
            />

            <Text fontSize="xl" mb={4}>
              선물내역
            </Text>
            <Box p={4} borderWidth="1px" borderRadius="lg" mb={8}>
              <HStack>
                {productDetail && (
                  <>
                    <Image boxSize="100px" src={productDetail?.imageURL} alt={productDetail?.name} />
                    <VStack align="start">
                      <Text fontSize="md" fontWeight="bold">
                        {productDetail?.brandInfo.name}
                      </Text>
                      <Text>
                        {productDetail?.name} X {quantity}개
                      </Text>
                    </VStack>
                  </>
                )}
              </HStack>
            </Box>
          </Box>
          <Box p={4} width={400}>
            <Text fontSize="xl" mb={4} mt={20} fontWeight={700}>
              결제 정보
            </Text>
            <VStack align="start" mb={4}>
              <Checkbox
                mt={5}
                name="receiptRequested"
                isChecked={formState.receiptRequested}
                onChange={handleInputChange}
              >
                현금영수증 신청
              </Checkbox>
              <Select
                name="receiptType"
                value={formState.receiptType}
                onChange={handleInputChange}
                isDisabled={!formState.receiptRequested}
              >
                <option value="개인소득공제">개인소득공제</option>
                <option value="사업자증빙용">사업지증빙용</option>
              </Select>
              <Input
                placeholder="(-없이) 숫자만 입력해주세요."
                name="receiptNumber"
                value={formState.receiptNumber}
                onChange={handleInputChange}
                isDisabled={!formState.receiptRequested}
              />
            </VStack>

            <HStack justify="space-between" mb={4} mt={10}>
              <Text fontSize="xl">최종 결제금액</Text>
              <Text fontSize="xl">{price}원</Text>
            </HStack>

            <Button colorScheme="yellow" size="lg" width="100%" onClick={handleSubmit}>
              {price}원 결제하기
            </Button>
          </Box>
        </Flex>
      </ChakraProvider>
    </div>
  );
};

export default Order;