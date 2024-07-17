import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

import { useGetDetail } from '@/api/hooks/useGetProductDetail';
import { Container } from '@/components/common/layouts/Container';
import { GiftDetail } from '@/components/features/Order/GiftDetail';
import { MessageBox } from '@/components/features/Order/MessageBox';
import { PaymentInfo } from '@/components/features/Order/PaymentInfo';
import { breakpoints } from '@/styles/variants';

export const Order = () => {
  const location = useLocation();
  const params = location.state;
  const { data } = useGetDetail(params);
  if (!data) return <></>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get('message');
    const cashReceipts = formData.get('cash_receipts') ? true : false;
    const select = formData.get('select');
    const phone = formData.get('phone');
    console.log(message, cashReceipts, select, phone);
  };
  return (
    <Container maxWidth={breakpoints.lg}>
      <Form onSubmit={handleSubmit}>
        <Container alignItems="center" style={{ alignItems: 'flex-start' }}>
          <MessageBox />
          <GiftDetail brandName={data.brandInfo.name} imageUrl={data.imageURL} name={data.name} />
        </Container>
        <PaymentInfo />
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
