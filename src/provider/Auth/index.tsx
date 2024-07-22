import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { authSessionStorage } from '@/utils/storage';

type AuthInfo = {
  id: string;
  name: string;
  token: string;
  isAuthenticated: boolean;
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
        isAuthenticated: true,
      });
      setIsReady(true);
    }
  }, [currentAuthToken]);

  if (!isReady) return <></>;
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
