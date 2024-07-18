import { useState } from 'react';

const useForm = () => {
  const [message, setMessage] = useState("");
  const [receiptRequested, setReceiptRequested] = useState(true);
  const [receiptType, setReceiptType] = useState("개인소득공제");
  const [receiptNumber, setReceiptNumber] = useState("");

  const handleReceiptTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReceiptType(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		e.preventDefault();
		const isNumeric = (str: string) => /^[0-9]+$/.test(str);
		let messageError = "";
		let receiptError = "";

		if (message.length == 0) {
			messageError = "메시지를 입력해주세요.";
		}
		if (message.length > 100) {
			messageError = "메시지는 100자 이내로 입력해주세요.";
		}
		if (receiptRequested && receiptNumber.length == 0) {
			receiptError = "현금영수증 번호를 입력해주세요.";
		}
		if (receiptRequested && !isNumeric(receiptNumber) ) {
			receiptError = "현금영수증 번호는 숫자만 입력해주세요.";
		}

		if (messageError) {
			alert(messageError);
		} else if (receiptError) {
			alert(receiptError);
		} else {
			alert('결제가 완료되었습니다.');
		}
	};

  return {
    message,
    setMessage,
    receiptRequested,
    setReceiptRequested,
    receiptType,
    setReceiptType,
    receiptNumber,
    setReceiptNumber,
    handleReceiptTypeChange,
    handleSubmit,
  };
};

export default useForm;
