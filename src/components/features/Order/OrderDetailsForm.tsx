import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import type { GoodsData } from '@/types';

import GoodsDetails from './GoodsDetails';
import { OrderDetailsInfo } from './OrderDetailsInfo';
import OrderDetailsMessageCard from './OrderDetailsMessageCard';

type Props = {
  productDetail: GoodsData;
  quantity: number;
};

const schema = z.object({
  message: z
    .string()
    .min(1, '메시지를 입력해주세요.')
    .max(100, '메시지는 100자 이내로 입력해주세요.'),
  hasCashReceipt: z.boolean(),
  cashReceiptType: z.string().optional(),
  cashReceiptNumber: z
    .string()
    .optional()
    .refine((val) => (val ? /^\d*$/.test(val) : true), '현금영수증 번호는 숫자로만 입력해주세요.'),
});

type FormData = z.infer<typeof schema>;

export const OrderDetailsForm = ({ productDetail, quantity }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: '',
      hasCashReceipt: false,
      cashReceiptType: '',
      cashReceiptNumber: '',
    },
  });

  const onSubmit = () => {
    alert('주문이 완료되었습니다.');
  };

  const totalAmount = productDetail.price.sellingPrice * quantity;

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <LeftSection>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <OrderDetailsMessageCard
                  formData={{ message: field.value }}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.message && <ErrorText>{errors.message.message}</ErrorText>}
            <SectionSpacer />
            <Subtitle>선물내역</Subtitle>
            <GoodsDetails productDetail={productDetail} count={quantity} />
          </LeftSection>
          <RightSection>
            <OrderDetailsInfo
              control={control}
              totalAmount={totalAmount}
              error={errors.cashReceiptNumber?.message || ''}
            />
          </RightSection>
        </FormWrapper>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: between;
  padding: 20px;
  margin: 0 auto;
  width: 80%;
  max-width: 1200px;
`;

const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  flex: 2;
  padding-top: 100px;
  border-right: 1px solid #ededed;
`;

const RightSection = styled.div`
  flex: 1;
  padding-top: 100px;
  margin-bottom: 100px;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SectionSpacer = styled.div`
  height: 100px;
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;

export default OrderDetailsForm;
