import { Box, Checkbox, Flex, Image, Input, Select, Text, Textarea } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/layouts/Container';

type FormData = {
  message: string;
  isChecked: boolean;
  cashReceiptNumber?: string;
};

export const OrderPage = () => {
  const location = useLocation();
  const { name, imageURL, totalPrice } = location.state || {};

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      message: '',
      isChecked: false,
      cashReceiptNumber: '',
    },
    mode: 'onBlur',
  });

  const isChecked = watch('isChecked');

  const onSubmit = () => {
    alert('주문이 완료되었습니다.');
  };

  return (
    <Container>
      <Flex w="full" p={5} align="flex-start" justify="center">
        <Box as="form" w="full" onSubmit={handleSubmit(onSubmit)}>
          <Flex>
            <Box w="65%">
              <Flex direction="column" align="center" justify="center">
                <Box w="full" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                  <Text fontWeight="bold" mb={4} textAlign="center">
                    나에게 주는 선물
                  </Text>
                  <Controller
                    name="message"
                    control={control}
                    rules={{
                      required: '메시지를 입력해주세요.',
                      maxLength: { value: 100, message: '메시지는 100자 이내로 입력해주세요.' },
                    }}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder="선물과 함께 보낼 메시지를 적어보세요"
                        bg="gray.100"
                        h="100px"
                      />
                    )}
                  />
                  {errors.message && (
                    <Text color="red" mt={2}>
                      {errors.message.message}
                    </Text>
                  )}
                  <Box bg="gray.100" w="100%" p={1} mt={10} mb={10}></Box>
                  <Text fontWeight="bold" mb={4} textAlign="left">
                    선물내역
                  </Text>
                  <Flex borderWidth="1px" borderRadius="lg" p={4} align="flex-start" mb={4}>
                    <Image src={imageURL} alt={name} boxSize="100px" objectFit="cover" mr={4} />
                    <Text fontSize="sm">{name}</Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>

            <Box w="35%">
              <Flex direction="column" align="center" justify="center">
                <Box w="full" borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                  <Flex direction="column" align="flex-start" mb={4}>
                    <Text fontWeight="bold" mb={4}>
                      결제 정보
                    </Text>
                    <Flex align="center" mb={2}>
                      <Controller
                        name="isChecked"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            isChecked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            colorScheme="yellow"
                            name={field.name}
                            ref={field.ref}
                          >
                            현금영수증 신청
                          </Checkbox>
                        )}
                      />
                    </Flex>
                    <Select placeholder="개인소득공제" mb={2}>
                      <option value="personal">개인소득공제</option>
                      <option value="business">사업자 지출증빙</option>
                    </Select>
                    {isChecked && (
                      <Controller
                        name="cashReceiptNumber"
                        control={control}
                        rules={{
                          required: '현금영수증 번호를 입력해주세요.',
                          pattern: {
                            value: /^\d+$/,
                            message: '현금영수증 번호는 숫자로만 입력해주세요.',
                          },
                        }}
                        render={({ field }) => (
                          <Input {...field} placeholder="(-없이) 숫자만 입력해주세요." mb={4} />
                        )}
                      />
                    )}
                    {errors.cashReceiptNumber && (
                      <Text color="red">{errors.cashReceiptNumber.message}</Text>
                    )}
                    <Flex justify="space-between" w="full" p={4} borderRadius="md" mb={4}>
                      <Text>최종 결제금액</Text>
                      <Text fontWeight="bold">{totalPrice}원</Text>
                    </Flex>
                    <Button type="submit">{totalPrice}원 결제하기</Button>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default OrderPage;
