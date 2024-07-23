import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Image,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ZodSchema } from 'zod';
import { z } from 'zod';

import { useAuth } from '@/api/hooks/useAuth';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';

const schema: ZodSchema = z.object({
  message: z
    .string()
    .min(1, '메시지를 입력해주세요.')
    .max(100, '메시지는 100자 이내로 입력해주세요.'),
  receiptNumber: z
    .string()
    .optional()
    .refine(
      (val) => val === undefined || /^\d*$/.test(val),
      '현금영수증 번호는 숫자로만 입력해주세요.',
    ),
});

type FormData = z.infer<typeof schema>;

export const OrderPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const location = useLocation();
  const { productId } = location.state || {};
  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductDetail({ productId: productId ?? '' });
  const [receiptType, setReceiptType] = useState<string>('personal');
  const [isReceipt, setIsReceipt] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: '',
      receiptNumber: '',
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleIncrement = () => setValue('quantity', (getValues('quantity') ?? 1) + 1);
  const handleDecrement = () => setValue('quantity', Math.max((getValues('quantity') ?? 1) - 1, 1));

  const handlePayment = (data: FormData) => {
    setError(null);
    setSuccess(null);

    if (isReceipt && !data.receiptNumber) {
      setError('현금영수증 번호를 입력해주세요.');
      return;
    }

    setSuccess('결제 되었습니다!');

    console.log('결제 처리');
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !productData) {
    return <Text>상품 정보를 불러오는 데 실패했습니다.</Text>;
  }

  const totalPrice = (productData?.price?.sellingPrice || 0) * (getValues('quantity') ?? 1);

  return (
    <Flex padding="4" justifyContent="center">
      <HStack align="start" spacing="8">
        <VStack align="start" spacing="4" width="full">
          <Text fontSize="2xl" fontWeight="bold">
            나에게 주는 선물
          </Text>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Textarea placeholder="선물과 함께 보낼 메시지를 적어보세요" {...field} />
            )}
          />
          {errors.message && (
            <Text color="red.500">
              {typeof errors.message === 'string'
                ? errors.message
                : errors.message?.message || '알 수 없는 오류가 발생했습니다.'}
            </Text>
          )}
          {error && <Text color="red.500">{error}</Text>}
          {success && <Text color="green.500">{success}</Text>}
          <Text fontSize="2xl" fontWeight="bold">
            선물내역
          </Text>
          <Box border="1px" borderColor="gray.200" borderRadius="md" padding="4" width="full">
            <Flex align="center">
              <Image src={productData.imageURL} alt={productData.name} boxSize="100px" />
              <VStack align="start" spacing="1" ml="4">
                <Text fontWeight="bold">{productData.brandInfo.name}</Text>
                <Text>{productData.name}</Text>
                <Text>{productData.price.sellingPrice}원</Text>
                <HStack>
                  <Button onClick={handleDecrement} disabled={(getValues('quantity') ?? 1) <= 1}>
                    -
                  </Button>
                  <Controller
                    name="quantity"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="number"
                        {...field}
                        min={1}
                        width="60px"
                        textAlign="center"
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          if (!isNaN(value)) {
                            setValue('quantity', value);
                          }
                        }}
                      />
                    )}
                  />
                  <Button onClick={handleIncrement}>+</Button>
                </HStack>
              </VStack>
            </Flex>
          </Box>
        </VStack>
        <VStack align="start" spacing="4">
          <Checkbox isChecked={isReceipt} onChange={(e) => setIsReceipt(e.target.checked)}>
            현금영수증 신청
          </Checkbox>
          <Select value={receiptType} onChange={(e) => setReceiptType(e.target.value)}>
            <option value="personal">개인소득공제</option>
            <option value="business">사업자증빙용</option>
          </Select>
          <Controller
            name="receiptNumber"
            control={control}
            render={({ field }) => <Input placeholder="(숫자만 입력해주세요)" {...field} />}
          />
          {errors.receiptNumber && (
            <Text color="red.500">
              {typeof errors.receiptNumber === 'string'
                ? errors.receiptNumber
                : errors.receiptNumber?.message || '알 수 없는 오류가 발생했습니다.'}
            </Text>
          )}
          <Text fontSize="2xl" fontWeight="bold">
            최종 결제금액: {totalPrice}원
          </Text>
          <Button colorScheme="yellow" width="full" onClick={handleSubmit(handlePayment)}>
            {totalPrice}원 결제하기
          </Button>
        </VStack>
      </HStack>
    </Flex>
  );
};
