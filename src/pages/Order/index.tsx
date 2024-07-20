import { FormProvider } from 'react-hook-form';

import { OrderListWithMessage } from '@/components/features/Order/organisms/OrderListWithMessage';
import { OrderReceipt } from '@/components/features/Order/organisms/OrderReceipt';
import { ProductTemplate } from '@/components/templates/ProductTemplate';
import { useOrderListAndPrice } from '@/hooks/useOrderListAndPrice';
import { useOrderValidation } from '@/hooks/useOrderValidation';

export const orderLetterPlaceHolder = `선물과 함께 보낼 메시지를 적어보세요`;

export const OrderPage = () => {
  const { orderList, totalPrice } = useOrderListAndPrice();
  const { onSubmit, ...methods } = useOrderValidation(orderList);
  const { register, handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProductTemplate
          leftMain={<OrderListWithMessage register={register} orderList={orderList} />}
          rightSide={<OrderReceipt register={register} totalPrice={totalPrice} />}
        />
      </form>
    </FormProvider>
  );
};
