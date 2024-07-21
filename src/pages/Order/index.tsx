import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { SplitContainer } from '@/components/common/layouts/Split';
import { CashReceiptForm } from '@/components/features/Order/Form/CashReceiptFormSection';
import { MessageFormSection } from '@/components/features/Order/Form/MessageFormSection';
import { OrderAsideSection } from '@/components/features/Order/OrderAsideSection';
import { OrderMainSection } from '@/components/features/Order/OrderMainSection';
import { storageOrderHistory } from '@/components/features/Order/util/storage';

type FormData = {
  message: string;
  cashReceiptData: {
    isReceiptChecked: boolean;
    receiptNumber: string;
  };
};

export const OrderPage = () => {
  const location = useLocation();
  const productData = location.state.product;
  const productId = productData.detail.id;
  const quantity = productData.quantity;

  const methods = useForm<FormData>({
    defaultValues: {
      message: '',
      cashReceiptData: { isReceiptChecked: false, receiptNumber: '' },
    },
  });

  const { handleSubmit, control, setValue } = methods;

  const onSubmit = () => {
    storageOrderHistory(productId);
    alert('주문이 완료되었습니다.');
  };

  const getTotalCost = () => {
    const sellingPrice = productData.detail.price.sellingPrice;
    return sellingPrice * quantity;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <Container maxWidth="1280px" justifyContent="flex-start" alignItems="flex-start">
            <SplitContainer>
              <div>
                <MessageFormSection onMessageChange={(message) => setValue('message', message)} />
                <OrderMainSection product={productData.detail} />
              </div>
              <div>
                <h6 className="order-aside-title">
                  <span className="span-title">결제 정보</span>
                </h6>
                <Divider aria-orientation="horizontal" />
                <Controller
                  name="cashReceiptData"
                  control={control}
                  render={({ field }) => (
                    <CashReceiptForm
                      onReceiptDataChange={(cashReceiptData) => field.onChange(cashReceiptData)}
                    />
                  )}
                />
                <Divider aria-orientation="horizontal" />
                <OrderAsideSection totalCost={getTotalCost()} />
              </div>
            </SplitContainer>
          </Container>
        </FormWrapper>
      </form>
    </FormProvider>
  );
};

const FormWrapper = styled.div`
  width: 100%;
`;
