import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { authSessionStorage } from '@/utils/storage';

// Auth 관련 타입 및 컨텍스트 정의
type AuthInfo = {
  id: string;
  name: string;
  token: string;
};

export const AuthContext = createContext<AuthInfo | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentAuthToken = authSessionStorage.get();
  const [isReady, setIsReady] = useState(!currentAuthToken);
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  useEffect(() => {
    if (currentAuthToken) {
      setAuthInfo({
        id: currentAuthToken, // TODO: 임시로 로그인 페이지에서 입력한 이름을 ID, token, name으로 사용
        name: currentAuthToken,
        token: currentAuthToken,
      });
      setIsReady(true);
    }
  }, [currentAuthToken]);

  if (!isReady) return <></>;

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

// Gift 관련 타입 및 컨텍스트 정의
type GiftContextType = {
  selectedProduct: unknown;
  setSelectedProduct: (product: unknown) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  message: string;
  setMessage: (message: string) => void;
};

export const GiftContext = createContext<GiftContextType | undefined>(undefined);

export const GiftProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProduct, setSelectedProduct] = useState<unknown>(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  return (
    <GiftContext.Provider
      value={{ selectedProduct, setSelectedProduct, quantity, setQuantity, message, setMessage }}
    >
      {children}
    </GiftContext.Provider>
  );
};

export const useGift = () => {
  const context = useContext(GiftContext);
  if (!context) {
    throw new Error('useGift must be used within a GiftProvider');
  }
  return context;
};

// Combined Provider
export const AppProvider = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <GiftProvider>{children}</GiftProvider>
  </AuthProvider>
);
