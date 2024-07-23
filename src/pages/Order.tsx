import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';

import { useProductDetail } from '@/api/hooks/useProductDetail';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import { Aside } from '@/components/features/Order/Aside';
import { Main } from '@/components/features/Order/Main';
import { MessageProvider } from '@/context/message/MessageProvider';
import { ErrorMessageContainer } from '@/styles';

type OrderFormValues = {
  message: string;
  isCashReceiptChecked: boolean;
  cashReceiptType: string;
  cashReceiptNumber: string;
};

export const Order = () => {
  const orderHistoryString = sessionStorage.getItem('orderHistory');
  const orderHistory = orderHistoryString ? JSON.parse(orderHistoryString) : {};
  const productId = orderHistory.id || 0;
  const quantity = orderHistory.quantity || 1;

  const { data, isLoading, isError } = useProductDetail(productId);
  const productDetail = data?.detail;

  const methods = useForm<OrderFormValues>({
    mode: 'onSubmit',
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<OrderFormValues> = (formData) => {
    console.log(formData);
    alert('주문이 완료되었습니다.');
  };

  if (isLoading) return <ErrorMessageContainer>Loading...</ErrorMessageContainer>;
  if (isError) return <ErrorMessageContainer>에러가 발생했습니다.</ErrorMessageContainer>;
  if (!productDetail) return <ErrorMessageContainer>찾는 상품이 없습니다.</ErrorMessageContainer>;

  return (
    <MessageProvider>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SplitLayout
            mainChildren={
              <Main
                name={productDetail.name}
                imageURL={productDetail.imageURL}
                brandName={productDetail.brandInfo.name}
                quantity={quantity}
              />
            }
            asideChildren={<Aside totalAmount={productDetail.price.sellingPrice * quantity} />}
          />
          <button type="submit">주문하기</button>
        </form>
      </FormProvider>
    </MessageProvider>
  );
};
