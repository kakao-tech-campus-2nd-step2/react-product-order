import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

interface FormValues {
  message: string;
  receiptRequested: boolean;
  receiptType: string;
  receiptNumber: string;
}

const usePaymentForm = () => {
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    if (data.message.length === 0) {
      alert("메시지를 입력해주세요.");
    } else if (data.message.length > 100) {
      alert("메시지는 100자 이내로 입력해주세요.");
    } else if (data.receiptRequested && data.receiptNumber.length === 0) {
      alert("현금영수증 번호를 입력해주세요.");
    } else if (data.receiptRequested && !/^[0-9]+$/.test(data.receiptNumber)) {
      alert("현금영수증 번호는 숫자만 입력해주세요.");
    } else {
      alert('결제가 완료되었습니다.');
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    setValue,
  };
};

export default usePaymentForm;
