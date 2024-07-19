const VALIDATE_NUMBER = /^\d*$/;

export const validatePayment = (message: string, hasCashRecipt: boolean, cashReciptNumber: string) => {
  if (!message) {
    return '메시지를 입력해주세요.';
  }
  if (hasCashRecipt && !cashReciptNumber) {
    return '현금영수증 번호를 입력해주세요.';
  }
  if (hasCashRecipt && !VALIDATE_NUMBER.test(cashReciptNumber)) {
    return '현금영수증 번호는 숫자로만 입력해주세요.';
  }
  return '';
};
