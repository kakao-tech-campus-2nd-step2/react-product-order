import { type ReactNode, useContext, useState } from 'react';
import { createContext } from 'react';

export const BuyInfoContext = createContext<Context | undefined>(undefined);

type Context = {
  price: number;
  setPrice: (price: number) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
};

export const BuyInfoProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const values = { price, setPrice, quantity, setQuantity };
  return <BuyInfoContext.Provider value={values}>{children}</BuyInfoContext.Provider>;
};

export const useBuyInfo = () => useContext(BuyInfoContext);
