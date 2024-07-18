import { useState } from 'react';

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

  const validateGiftMessage = (message: string) => {
    if (message?.trim() === '') {
      alert('메세지를 입력해주세요.');
      handleInputChange('gitfMessage', '');
      return false;
    }

    if (message?.length > 100) {
      alert('선물 메세지는 100자 이내로 입력해 주세요.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    alert('주문이 완료되었습니다.');
  };

  const handleClickButton = () => {
    const isValidate = validateGiftMessage(formData.gitfMessage);

    if (isValidate) handleSubmit();
  };

  return {
    formData,
    handleCheckboxChange,
    handleInputChange,
    handleClickButton,
  };
};
