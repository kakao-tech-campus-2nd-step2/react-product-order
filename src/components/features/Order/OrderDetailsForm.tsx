import styled from '@emotion/styled';
import { useState } from 'react';

import type { GoodsData } from '@/types';

import GoodsDetails from './GoodsDetails';
import { OrderDetailsInfo } from './OrderDetailsInfo';
import OrderDetailsMessageCard from './OrderDetailsMessageCard';

type Props = {
  productDetail: GoodsData;
  quantity: number;
};

export const OrderDetailsForm = ({ productDetail, quantity }: Props) => {
  const [formData, setFormData] = useState({
    message: '',
    hasCashReceipt: false,
    cashReceiptType: '',
    cashReceiptNumber: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked ?? value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.message) {
      setError('메시지를 입력해주세요.');
      return;
    }

    if (formData.message.length > 100) {
      setError('메시지는 100자 이내로 입력해주세요.');
      return;
    }

    if (formData.hasCashReceipt) {
      if (!formData.cashReceiptNumber) {
        setError('현금영수증 번호를 입력해주세요.');
        return;
      }

      if (!/^\d+$/.test(formData.cashReceiptNumber)) {
        setError('현금영수증 번호는 숫자로만 입력해주세요.');
        return;
      }
    }

    setError('');
    alert('주문이 완료되었습니다.');
  };

  const totalAmount = productDetail.price.sellingPrice * quantity;

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormWrapper>
          <LeftSection>
            <OrderDetailsMessageCard formData={formData} onChange={handleInputChange} />
            <SectionSpacer />
            <Subtitle>선물내역</Subtitle>
            <GoodsDetails productDetail={productDetail} count={quantity} />
          </LeftSection>
          <RightSection>
            <OrderDetailsInfo
              formData={formData}
              onChange={handleInputChange}
              totalAmount={totalAmount}
              error={error}
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

export default OrderDetailsForm;
