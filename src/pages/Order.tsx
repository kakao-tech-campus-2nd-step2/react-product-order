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

  const methods = useForm<OrderFormValues>({ mode: 'onSubmit' });

  if (isLoading) return <ErrorMessageContainer>Loading...</ErrorMessageContainer>;
  if (isError) return <ErrorMessageContainer>에러가 발생했습니다.</ErrorMessageContainer>;
  if (!productDetail) return <ErrorMessageContainer>찾는 상품이 없습니다.</ErrorMessageContainer>;

  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<OrderFormValues> = (formData) => {
    const message = formData.message;

    if (!message.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    } else if (message.length > 100) {
      alert('메시지는 100자 이내로 입력해주세요.');
      return;
    } else if (formData.isCashReceiptChecked && !formData.cashReceiptNumber.trim()) {
      alert('현금영수증 번호를 입력해주세요.');
      return;
    }

    // 결제 처리
    console.log(formData);
    alert('주문이 완료되었습니다.');
  };

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
        </form>
      </FormProvider>
    </MessageProvider>
  );
};
