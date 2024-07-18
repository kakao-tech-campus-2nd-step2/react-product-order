import { FormEvent, useState } from 'react';

import { OrderFormType } from '@/types/orderType';

export const useOrderForm = () => {
  const [formData, setFormData] = useState<OrderFormType>({
    productId: 1,
    productQuantity: 1,
    gitfMessage: '',
    isCashChecked: false,
    cashReceiptType: '개인소득공제',
    cashReceiptNumber: '',
  });

  const setProductDetail = (productId: number, productQuantity: number) => {
    setFormData((prevData) => ({
      ...prevData,
      productId,
      productQuantity,
    }));
  };

  const handleCheckboxChange = (checkboxField: keyof OrderFormType) => {
    setFormData((prevData) => ({
      ...prevData,
      [checkboxField]: !prevData[checkboxField],
    }));
  };

  const handleInputChange = (
    inputField: keyof OrderFormType,
    value: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [inputField]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.gitfMessage?.trim() === '') {
      alert('메세지를 입력해주세요.');
      handleInputChange('gitfMessage', '');
      return;
    }

    if (formData.gitfMessage.length > 100) {
      alert('선물 메세지는 100자 이내로 입력해 주세요.');
      return;
    }

    if (formData.isCashChecked) {
      if (!formData.cashReceiptNumber) {
        alert('현금 영수증 번호를 입력해주세요.');
        return;
      }

      if (!formData.cashReceiptNumber.match(/^\d+$/)) {
        alert('(-없이) 숫자만 입력해주세요.');
        return;
      }

      if (!formData.cashReceiptNumber.match(/^01\d{9}$/)) {
        alert('번호를 정확히 입력해주세요.');
        return;
      }
    }

    // console.log(formData);
    alert('주문이 완료되었습니다.');
  };

  return {
    formData,
    setProductDetail,
    handleCheckboxChange,
    handleInputChange,
    handleSubmit,
  };
};
