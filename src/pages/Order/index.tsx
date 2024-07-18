import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Aside, AsideContainer, Main, MainContainer } from '@/components/common/layouts/Split';
import {
  MessageFormSection,
  validateMessageForm,
} from '@/components/features/Order/Form/MessageFormSection';
import { OrderAsideSection } from '@/components/features/Order/OrderAsideSection';
import { OrderMainSection } from '@/components/features/Order/OrderMainSection';
import { storageOrderHistory } from '@/components/features/Order/util/storage';
import { CashReceiptForm } from '@/components/features/Order/Form/CashReceiptForm';
import { Divider } from '@chakra-ui/react';

type FormData = {
  message: string;
  receiptNumber: string;
};

export const OrderPage = () => {
  const location = useLocation();
  const productData = location.state.product;
  const productId = location.state.product.id;
  const quantity = productData.quantity;

  const getTotalCost = () => {
    const sellingPrice = productData.product.detail.price.sellingPrice;
    return sellingPrice * quantity;
  };

  const [formData, setFormData] = useState<FormData>({ message: '', receiptNumber: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const messageError = validateMessageForm(formData.message);

    if (messageError) {
      alert(`${messageError}`);
      return;
    }
    storageOrderHistory(productId);
    alert('주문이 완료되었습니다.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormWrapper>
        <Container maxWidth="1280px" justifyContent="flex-start" alignItems="flex-start">
          <InnerContainer>
            <Main>
              <MainContainer>
                <MessageFormSection
                  onMessageChange={(message) => setFormData({ ...formData, message })}
                />
                <OrderMainSection product={productData.product} />
              </MainContainer>
            </Main>
            <Aside>
              <AsideContainer>
                <h6 className="order-aside-title">
                  <span className="span-title">결제 정보</span>
                </h6>
                <Divider aria-orientation="horizontal" />
                <CashReceiptForm />
                <OrderAsideSection totalCost={getTotalCost()} />
              </AsideContainer>
            </Aside>
          </InnerContainer>
        </Container>
      </FormWrapper>
    </form>
  );
};

const FormWrapper = styled.div`
  width: 100%;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`;
