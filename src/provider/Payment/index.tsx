import { createContext, useState } from 'react';

type PaymentType = {
  productId: string;
  imageURL: string;
  count: number;
};

export const PaymentContext = createContext<
  { paymentInfo: PaymentType; setPaymentInfo: (info: PaymentType) => void } | undefined
>(undefined);

export default function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [paymentInfo, setPaymentInfo] = useState({
    productId: '',
    imageURL: '',
    count: 1,
  });

  return (
    <PaymentContext.Provider value={{ paymentInfo, setPaymentInfo }}>
      {children}
    </PaymentContext.Provider>
  );
}
