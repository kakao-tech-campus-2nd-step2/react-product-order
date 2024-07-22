import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { RouterPath } from '@/routes';
import { useAuth } from './AuthContext';

type RequireAuthProps = {
  children: ReactElement;
};

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { authToken } = useAuth();

  if (!authToken) {
    return <Navigate to={RouterPath.login} replace />;
  }

  return children;
};

export default RequireAuth;
