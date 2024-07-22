import { Box, Button, Center, Checkbox, Flex, FormControl, FormLabel, Image, Input, Select, Spinner, Text, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import type { FieldErrors,SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

interface Product {
  id: string;
  name: string;
  imageURL: string;
  price: { sellingPrice: number };
}

const schema = z.object({
  applyReceipt: z.boolean(),
  receiptType: z.enum(['personal', 'business']),
  receiptNumber: z.string().refine(value => /^\d*$/.test(value), {
    message: '현금 영수증 번호는 숫자만 입력해야 합니다.',
  }).optional(),
  cardMessage: z.string().min(1, '카드 메시지를 입력해주세요.').max(100, '카드 메시지는 100자 이내로 입력해주세요.'),
});

type CheckoutFormValues = z.infer<typeof schema>;

const CheckoutPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { state } = useLocation() as { state: { totalPrice: number; product: Product; quantity: number } };
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<CheckoutFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      applyReceipt: false,
      receiptType: 'personal',
      receiptNumber: '',
      cardMessage: '',
    },
  });

  useEffect(() => {
    if (state && state.product) {
      setProduct(state.product);
      setIsLoading(false);
      return;
    }

    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${productId}/detail`);
        setProduct(response.data.detail);
        setIsLoading(false);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Product not found. Redirecting to home page.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        navigate('/');
      }
    };

    fetchProductDetail();
  }, [productId, state, navigate, toast]);

  const onSubmit: SubmitHandler<CheckoutFormValues> = (_data) => {
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login', { state: { from: `/checkout/${productId}` } });
      return;
    }

    // 실제 결제 처리 로직
    toast({
      title: '결제 완료',
      description: '결제가 성공적으로 완료되었습니다.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const onError = (errors: FieldErrors<CheckoutFormValues>) => {
    if (errors.cardMessage) {
      toast({
        title: 'Error',
        description: errors.cardMessage.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } else if (errors.receiptNumber) {
      toast({
        title: 'Error',
        description: errors.receiptNumber.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  if (isLoading || !product) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Flex justifyContent="center" minHeight="100vh" padding="20px">
      <Flex maxW="1200px" width="100%">
        <Box flex="3" borderRight="1px solid rgb(237, 237, 237)" padding="20px">
          <Flex flexDirection="column" justifyContent="center" alignItems="center" borderBottom="8px solid #EDEDED">
            <Text fontSize="lg" fontWeight="bold">
              나에게 주는 선물
            </Text>
            <Box width="100%" padding="30px 60px">
              <Controller
                name="cardMessage"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="선물과 함께 보낼 메시지를 적어보세요"
                    mt="4"
                    bgColor="#EDF2F7"
                    height="100px"
                  />
                )}
              />
            </Box>
          </Flex>
          <Flex flexDirection="column" padding="16px">
            <Text fontSize="lg" fontWeight="bold">
              선물내역
            </Text>
            <Flex mt="16px" border="2px solid rgb(237, 237, 237)" borderRadius="8px" padding="20px 16px 16px">
              <Image src={product.imageURL} alt={product.name} boxSize="65px" />
              <Flex flexDirection="column" ml="8px">
                <Text color="gray.600" fontSize="13px">
                  {product.name}
                </Text>
                <Text mb="4" fontSize="14px">
                  {product.name}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>

        <Box flex="2" padding="20px">
          <Text fontSize="lg" fontWeight="bold" py="20px" borderBottom="1px solid rgb(237, 237, 237)">
            결제 정보
          </Text>
          <Flex borderBottom="1px solid rgb(237, 237, 237)" flexDirection="column" justifyContent="space-between" alignItems="center" p="4" mb="4">
            <FormControl display="flex" alignItems="center">
              <Controller
                name="applyReceipt"
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} mr="4" isChecked={!!field.value} value={field.value ? "true" : "false"} />
                )}
              />
              <FormLabel mb="0">현금 영수증 신청</FormLabel>
            </FormControl>

            <Controller
              name="applyReceipt"
              control={control}
              render={({ field: applyReceiptField }) => (
                <>
                  {!!applyReceiptField.value && (
                    <>
                      <FormControl display="flex" alignItems="center" mt="4">
                        <Controller
                          name="receiptType"
                          control={control}
                          render={({ field: receiptTypeField }) => (
                            <Select {...receiptTypeField}>
                              <option value="personal">개인소득공제</option>
                              <option value="business">사업자증빙용</option>
                            </Select>
                          )}
                        />
                      </FormControl>
                      <FormControl mt="4">
                        <Controller
                          name="receiptNumber"
                          control={control}
                          render={({ field: receiptNumberField }) => (
                            <Input
                              {...receiptNumberField}
                              id="receiptNumber"
                              type="text"
                              placeholder="(-없이) 숫자만 입력해주세요."
                            />
                          )}
                        />
                      </FormControl>
                    </>
                  )}
                </>
              )}
            />
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" bgColor="#F5F5F5" padding="20px">
            <Text fontSize="15px" fontWeight="bold">
              최종 결제 금액
            </Text>
            <Text fontSize="15px" fontWeight="bold">
              {state.totalPrice}원
            </Text>
          </Flex>
          <Button bgColor="#FEE500" mt="4" onClick={handleSubmit(onSubmit, onError)} width="100%" height="60px" boxSizing="border-box">
            {state.totalPrice}원 결제하기
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CheckoutPage;
