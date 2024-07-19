import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import * as z from 'zod';

interface ProductDetail {
  id: number;
  name: string;
  imageURL: string;
  brandInfo: {
    name: string;
  };
}

const schema = z.object({
  message: z
    .string()
    .max(100, { message: '메시지를 100자 이내로 입력해주세요.' })
    .nonempty('메시지를 입력해주세요.'),
  receiptRequested: z.boolean(),
  receiptNumber: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: '현금 영수증 번호는 숫자만 입력해주세요.',
    }),
});

type FormData = z.infer<typeof schema>;

export const OrderPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { state } = useLocation();
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const receiptRequested = watch('receiptRequested');

  useEffect(() => {
    const fetchProductOrder = async () => {
      try {
        const response = await axios.get(
          `https://kakao-tech-campus-mock-server.vercel.app/api/v1/products/${orderId}/detail`,
        );
        const data = response.data.detail;

        setProductDetail({
          id: data.id,
          name: data.name,
          imageURL: data.imageURL,
          brandInfo: {
            name: data.brandInfo.name,
          },
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };
    fetchProductOrder();
  }, [orderId]);

  if (isLoading || !productDetail) {
    return (
      <Center minHeight="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    if (receiptRequested && !data.receiptNumber) {
      alert('현금 영수증 번호를 입력해주세요.');
      return;
    }
    alert('결제가 완료되었습니다.');
  };

  return (
    <Flex justifyContent="space-between" padding="20px" height="100vh">
      <Box flex="3" borderRight="1px solid rgb(237, 237, 237)">
        <Flex
          flexDirection="column"
          justifyContent="centers"
          alignItems="center"
          borderBottom="8px solid #EDEDED"
        >
          <Text fontSize="lg" fontWeight="bold">
            나에게 주는 선물
          </Text>
          <Box width="100%" padding="30px 60px">
            <FormControl isInvalid={!!errors.message}>
              <Controller
                name="message"
                control={control}
                defaultValue=""
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
              {errors.message && (
                <Text color="red" fontSize="sm">
                  {errors.message.message}
                </Text>
              )}
            </FormControl>
          </Box>
        </Flex>
        <Flex flexDirection="column" padding="16px">
          <Text fontSize="lg" fontWeight="bold">
            선물내역
          </Text>
          <Flex
            mt="16px"
            border="2px solid rgb(237, 237, 237)"
            borderRadius="8px"
            padding="20px 16px 16px"
          >
            <Image src={productDetail.imageURL} alt={productDetail.name} boxSize="65px" />
            <Flex flexDirection="column" ml="8px">
              <Text color="gray.600" fontSize="13px">
                {productDetail.brandInfo.name}
              </Text>
              <Text mb="4" fontSize="14px">
                {productDetail.name}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <Box flex="2" padding="16px">
        <Text fontSize="lg" fontWeight="bold" py="20px" borderBottom="1px solid rgb(237, 237, 237)">
          결제 정보
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            borderBottom="1px solid rgb(237, 237, 237)"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            p="4"
            mb="4"
          >
            <FormControl display="flex" alignItems="center">
              <Controller
                name="receiptRequested"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    isChecked={field.value}
                    value={field.value ? 'true' : 'false'}
                    mr="4"
                  />
                )}
              />
              <FormLabel mb="0">현금 영수증 신청</FormLabel>
            </FormControl>

            {receiptRequested && (
              <>
                <FormControl display="flex" alignItems="center" mt="4">
                  <Select>
                    <option value="personal">개인소득공제</option>
                    <option value="business">사업자증빙용</option>
                  </Select>
                </FormControl>
                <FormControl mt="4" isInvalid={!!errors.receiptNumber}>
                  <Controller
                    name="receiptNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="receiptNumber"
                        type="text"
                        placeholder="(-없이) 숫자만 입력해주세요."
                      />
                    )}
                  />
                  {errors.receiptNumber && (
                    <Text color="red" fontSize="sm">
                      {errors.receiptNumber.message}
                    </Text>
                  )}
                </FormControl>
              </>
            )}
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" bgColor="#F5F5F5" padding="20px">
            <Text fontSize="15px" fontWeight="bold">
              최종 결제 금액
            </Text>
            <Text fontSize="15px" fontWeight="bold">
              {state}원
            </Text>
          </Flex>
          <Button
            type="submit"
            bgColor="#FEE500"
            mt="4"
            width="100%"
            height="60px"
            boxSizing="border-box"
          >
            {state}원 결제하기
          </Button>
        </form>
      </Box>
    </Flex>
  );
};
