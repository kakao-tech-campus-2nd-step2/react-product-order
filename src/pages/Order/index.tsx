import { Divider, Text, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { type FieldValues, FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { z, ZodIssueCode } from 'zod';

import { GiftMessageSection } from '@/components/features/Order/GiftMessageSection';
import { GiftSummarySection } from '@/components/features/Order/GiftSummarySection';
import { PaymentInfoSection } from '@/components/features/Order/PaymentInfoSection';
import { breakpoints } from '@/styles/variants';
import type { ProductDetail, ProductOption } from '@/types';
import { orderLocalStorage } from '@/utils/storage';

const schema = z
  .object({
    message: z
      .string()
      .min(1, '메시지를 입력해주세요.')
      .max(100, '메시지는 100자 이내로 입력해주세요.'),
    cashReceipt: z.boolean(),
    receiptType: z.string().optional(),
    receiptNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.cashReceipt && !data.receiptNumber) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        path: ['receiptNumber'],
        message: '현금영수증 번호를 입력해주세요.',
      });
    } else if (data.receiptNumber && !/^\d+$/.test(data.receiptNumber)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        path: ['receiptNumber'],
        message: '현금영수증 번호는 숫자로만 입력해주세요.',
      });
    }
  });

type FormValues = z.infer<typeof schema>;

export const OrderPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<
    (ProductDetail & { selectedOption: ProductOption | null; quantity: number }) | undefined
  >(undefined);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: '',
      cashReceipt: false,
      receiptType: '',
      receiptNumber: '',
    },
  });

  useEffect(() => {
    const product = orderLocalStorage.get();
    if (product && product.product) {
      setSelectedProduct(product.product);
      const { price, selectedOption, quantity } = product.product;
      const additionalPrice = selectedOption?.additionalPrice || 0;
      setTotalPrice((price.sellingPrice + additionalPrice) * quantity);
    }
  }, []);

  const handleOrder: SubmitHandler<FormValues> = (_data) => {
    alert('주문이 완료되었습니다.');
    orderLocalStorage.set(null);
  };

  const handleError = (errors: FieldValues) => {
    if (errors.message) {
      alert(errors.message.message);
    } else if (errors.receiptNumber) {
      alert(errors.receiptNumber.message);
    }
  };

  if (!selectedProduct) {
    return (
      <Wrapper>
        <Text>주문할 상품이 없습니다.</Text>
      </Wrapper>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleOrder, handleError)}>
        <Wrapper>
          <VStack w="1000px" spacing={4} align="stretch">
            <GiftMessageSection />
            <Divider />
            <GiftSummarySection product={selectedProduct} />
          </VStack>
          <PaymentInfoSection totalPrice={totalPrice} />
        </Wrapper>
      </form>
    </FormProvider>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-width: ${breakpoints.lg};
  min-height: 100vh;
  margin: 0 auto;

  @media screen and (min-width: ${breakpoints.md}) {
    flex-direction: row;
  }
`;
