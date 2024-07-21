import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Input, Button, Text, Checkbox, Box, Textarea, HStack, Select, Image, Divider, Flex, Center } from '@chakra-ui/react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProductDetail } from '@/hooks/useProductDetail';

const schema = z.object({
  message: z.string().min(1, '메시지를 입력하세요').max(100, '메시지는 100자 이내로 입력하세요'),
  receipt: z.string().optional().refine(value => /^\d*$/.test(value || ''), '현금 영수증 번호는 숫자만 입력하세요'),
  receiptEnabled: z.boolean(),
  receiptType: z.enum(['personal', 'business']),
});

type CheckoutFormValues = z.infer<typeof schema>;

const CheckoutPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity, setQuantity, isLoading, isError } = useProductDetail(productId!);

  const { register, handleSubmit, control, setError, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: '',
      receipt: '',
      receiptEnabled: false,
      receiptType: 'personal',
    }
  });

  const receiptEnabled = useWatch({
    control,
    name: 'receiptEnabled',
    defaultValue: false,
  });

  useEffect(() => {
    const state = location.state as { quantity: number };
    if (state && state.quantity) {
      setQuantity(state.quantity);
    }
  }, [location.state, setQuantity]);

  const onSubmit = (data: CheckoutFormValues) => {
    if (data.receiptEnabled && !data.receipt?.trim()) {
      setError('receipt', { type: 'manual', message: '현금 영수증 번호를 입력하세요' });
      return;
    }

    try {
      alert('주문이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('결제 실패:', error);
      alert('결제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (isLoading) return <Text>로딩중...</Text>;
  if (isError) return <Text>Failed to load product details</Text>;

  return (
    <Flex p="20px" direction="row" justifyContent="space-between" as="form" onSubmit={handleSubmit(onSubmit)}>
      <Box width="70%">
        <Center>
          <Text fontSize="2xl" fontWeight="bold" mb="4">나에게 주는 선물</Text>
        </Center>
        <Center>
          <Textarea
            placeholder="선물과 함께 보낼 메시지를 적어보세요"
            {...register('message')}
            mb="4"
          />
        </Center>
        {errors.message && <Text color="red.500">{errors.message.message}</Text>}
        <Divider mb="4" />
        <Text fontSize="2xl" fontWeight="bold" mb="4">선물내역</Text>
        {product && (
          <Box display="flex" alignItems="center" mb="4">
            <Image
              src={product.imageURL}
              alt={product.name}
              boxSize="100px"
              objectFit="cover"
              mr="4"
            />
            <Box>
              <Text>{product.name}</Text>
              <Text>x{quantity}</Text>
            </Box>
          </Box>
        )}
      </Box>
      <Box width="30%">
        <Text fontSize="2xl" fontWeight="bold" mb="4">결제 정보</Text>
        <Controller
          name="receiptEnabled"
          control={control}
          render={({ field }) => (
            <Checkbox isChecked={field.value} onChange={field.onChange} mb="4">
              현금영수증 신청
            </Checkbox>
          )}
        />
        <Box mb="4">
          <Controller
            name="receiptType"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <option value="personal">개인소득공제</option>
                <option value="business">사업자지출증빙</option>
              </Select>
            )}
          />
          <Input
            placeholder="(-없이) 숫자만 입력해주세요."
            {...register('receipt')}
            mt="2"
            isDisabled={!receiptEnabled}
          />
          {errors.receipt && <Text color="red.500">{errors.receipt.message}</Text>}
        </Box>
        <HStack justifyContent="space-between" mb="4">
          <Text fontSize="xl">최종 결제금액</Text>
          <Text fontSize="2xl" fontWeight="bold">{product ? `${product.price.sellingPrice * quantity}원` : '0원'}</Text>
        </HStack>
        <Button
          bg="yellow"
          color="black"
          width="100%"
          type="submit"
        >
          {product ? `${product.price.sellingPrice * quantity}원 결제하기` : '결제하기'}
        </Button>
      </Box>
    </Flex>
  );
};

export default CheckoutPage;