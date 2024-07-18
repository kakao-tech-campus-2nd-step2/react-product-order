import { useState } from 'react';

const useForm = () => {
  const [message, setMessage] = useState("");
  const [receiptRequested, setReceiptRequested] = useState(true);
  const [receiptType, setReceiptType] = useState("개인소득공제");
  const [receiptNumber, setReceiptNumber] = useState("");

  const handleReceiptTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReceiptType(event.target.value);
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
  };
};

export default useForm;
