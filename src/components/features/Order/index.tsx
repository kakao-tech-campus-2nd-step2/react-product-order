import styled from '@emotion/styled';
import React, { useState } from 'react';

import { Spacing } from '@/components/common/layouts/Spacing';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import type { FormData, OrderHistory } from '@/types';

import { HEADER_HEIGHT } from '../Layout/Header';
import { GoodsInfo } from './GoodsInfo';
import { OrderFormMessageCard } from './MessageCard';
import { OrderFormInfo } from './OrderInfo';

type Props = {
  orderHistory: OrderHistory;
};

export const OrderForm = ({ orderHistory }: Props) => {
  const { id, count } = orderHistory;

  const [formData, setFormData] = useState<FormData>({
    cashReceiptNumber: '',
    cashReceiptType: 'PERSONAL',
    hasCashReceipt: false,
    messageCardTextMessage: '',
    productId: id,
    productQuantity: count,
    receiverId: 0,
    senderId: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'cashReceiptType') {
      setFormData((prev) => ({ ...prev, [name]: value as 'PERSONAL' | 'BUSINESS' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    alert('결제가 완료되었습니다.');
  };

  const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    if (e.key === 'Enter' && !['TEXTAREA'].includes(target.tagName)) {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleForm} onKeyDown={preventEnterKeySubmission}>
      <SplitLayout
        sidebar={
          <OrderFormInfo
            orderHistory={orderHistory}
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        }
      >
        <Wrapper>
          <OrderFormMessageCard
            messageCardTextMessage={formData.messageCardTextMessage}
            handleInputChange={handleInputChange}
          />
          <Spacing height={8} backgroundColor="#ededed" />
          <GoodsInfo orderHistory={orderHistory} />
        </Wrapper>
      </SplitLayout>
    </form>
  );
};

const Wrapper = styled.div`
  border-left: 1px solid #e5e5e5;
  height: calc(100vh - ${HEADER_HEIGHT});
`;
