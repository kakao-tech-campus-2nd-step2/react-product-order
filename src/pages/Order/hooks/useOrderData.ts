import { useState } from 'react';

interface OrderData {
  message: string;
  hasCashRecipt: boolean;
  cashReciptType: string;
  cashReciptNumber: string;
}

type HandleOrderDataChange = (name: string, value: any) => void;

export default function useOrderData() {
  const [orderData, setOrderData] = useState<OrderData>({
    message: '',
    hasCashRecipt: false,
    cashReciptType: '개인소득공제',
    cashReciptNumber: '',
  });

  const handleOrderDataChange: HandleOrderDataChange = (name, value) => {
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return {
    orderData,
    handleOrderDataChange,
  };
}
