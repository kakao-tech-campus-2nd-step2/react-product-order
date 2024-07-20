import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import Paths from '@constants/Paths';
import Page from '@components/templates/Page';
import Container from '@components/atoms/container/Container';
import { defaultBorderColor } from '@styles/colors';
import ProductMessageForm from '@components/organisms/product/ProductMessageForm';
import ProductOrderHistorySection from '@components/organisms/product/ProductOrderHistorySection';
import ProductOrderForm from '@components/organisms/product/ProductOrderForm';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { OrderRequestBody } from '@/types/request';
import { OrderFormData, ProductOrderPageState } from '@/types';
import { CashReceiptOptions } from '@/constants';

function ProductOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate(Paths.MAIN_PAGE);
    }
  }, [location.state, navigate]);

  const state = location.state as ProductOrderPageState;
  const { count, productDetails: product } = state;

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    control,
    watch,
  } = useForm<OrderFormData>({
    mode: 'onChange',
    defaultValues: {
      messageCardTextMessage: '',
      hasCashReceipt: false,
      cashReceiptType: CashReceiptOptions.PERSONAL,
      cashReceiptNumber: '',
    },
  });
  const onSubmit = useCallback(async (data: OrderFormData) => {
    const orderBody: OrderRequestBody = {
      productId: product.id,
      productOptionId: 1,
      productQuantity: count,
      messageCardTemplateId: 0,
      messageCardTextMessage: data.messageCardTextMessage,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: data.hasCashReceipt,
      cashReceiptType: data.cashReceiptType,
      cashReceiptNumber: data.cashReceiptNumber,
    };
    alert(`${orderBody.productId}번 상품의 주문이 완료되었습니다.`);
  }, [count, product]);

  return (
    <Page>
      <Container
        elementSize={{
          width: '100%',
          height: '100vh',
        }}
        justifyContent="center"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          css={css`
            display: flex;
            width: 100%;
            max-width: 1280px;
            border-right: 1px solid ${defaultBorderColor};
            border-left: 1px solid ${defaultBorderColor};
          `}
        >
          <Container
            elementSize="full-width"
            alignItems="center"
            flexDirection="column"
            padding="44px 0px 32px"
          >
            <ProductMessageForm
              register={register}
              errors={errors}
            />
            <ProductOrderHistorySection productDetails={product} count={count} />
          </Container>
          <Container
            elementSize="full-width"
            alignItems="center"
            flexDirection="column"
            maxWidth="360px"
          >
            <ProductOrderForm
              productDetails={product}
              count={count}
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              control={control}
              watch={watch}
            />
          </Container>
        </form>
      </Container>
    </Page>
  );
}

export default ProductOrderPage;
