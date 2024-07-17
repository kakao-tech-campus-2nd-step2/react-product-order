import { type ReactNode, useContext, useState } from 'react';
import { createContext } from 'react';

export type Context = {
  price: number;
  setPrice: (price: number) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
};
const defaultBuyInfo = {
  price: 0,
  setPrice: () => {},
  quantity: 1,
  setQuantity: () => {},
};
export const BuyInfoContext = createContext<Context>(defaultBuyInfo);
export const BuyInfoProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const values = { price, setPrice, quantity, setQuantity };
  return <BuyInfoContext.Provider value={values}>{children}</BuyInfoContext.Provider>;
};

export const useBuyInfo = () => useContext(BuyInfoContext);
