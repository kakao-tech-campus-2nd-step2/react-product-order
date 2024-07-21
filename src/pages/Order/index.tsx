import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useGetDetail } from '@/api/hooks/useGetProductDetail';
import { Container } from '@/components/common/layouts/Container';
import { GiftDetail } from '@/components/features/Order/GiftDetail';
import { MessageBox } from '@/components/features/Order/MessageBox';
import { PaymentInfo } from '@/components/features/Order/PaymentInfo';
import { breakpoints } from '@/styles/variants';

export const Order = () => {
  const { control, register, handleSubmit } = useForm();

  const location = useLocation();
  const params = location.state;
  const { data } = useGetDetail(params);
  if (!data) return <></>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (formData: any) => {
    if (!formData.isCashResceipts) {
      //현금영수증 미신청시 message만 전달
      console.log(formData.message);
      return;
    }
    console.log(formData);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onErrors = (error: any) => {
    if (error.message) {
      alert(error.message.message);
      return;
    }
    if (error.phone) {
      alert(error.phone.message);
      return;
    }
  };

  return (
    <Container maxWidth={breakpoints.lg}>
      <Form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <Container alignItems="center" style={{ alignItems: 'flex-start' }}>
          <MessageBox register={register} />
          <GiftDetail brandName={data.brandInfo.name} imageUrl={data.imageURL} name={data.name} />
        </Container>
        <PaymentInfo control={control} register={register} />
      </Form>
    </Container>
  );
};

const Form = styled.form`
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 20px;
  padding: 10px;
  border-left: 1px solid rgb(237, 237, 237);
  border-right: 1px solid rgb(237, 237, 237);
`;
