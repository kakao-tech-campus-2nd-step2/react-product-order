import { useState } from 'react';

export const useOrderForm = () => {
  const [receiptNumber, setReceiptNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isReceiptChecked, setIsReceiptChecked] = useState(false);

  const isValidReceiptNumber = (number: string) => /^[0-9]+$/.test(number);

  const handleClick = () => {
    if (message.length > 99) {
      alert('메시지는 100자 이내로 입력해주세요.');
    } else if (message.trim() === '') {
      alert('메시지를 입력해주세요.');
    } else if (isReceiptChecked && !isValidReceiptNumber(receiptNumber.trim())) {
      alert('현금영수증 번호에는 숫자만 입력해주세요.');
    } else if (isReceiptChecked && receiptNumber.trim() === '') {
      alert('현금영수증 번호를 입력해주세요.');
    } else {
      alert('주문이 정상적으로 처리 되었습니다.');
    }
  };

  return {
    message,
    setMessage,
    isReceiptChecked,
    setIsReceiptChecked,
    receiptNumber,
    setReceiptNumber,
    handleClick,
  };
};
