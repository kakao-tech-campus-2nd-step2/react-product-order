import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/provider/Auth';

interface Props {
  nextPageUrl?: string;
  state?: any;
}

export const useAuthRedirect = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectToLogin = (redirectUrl: string) => {
    if (window.confirm('로그인이 필요한 메뉴입니다. 로그인 페이지로 이동하시겠습니까?')) {
      navigate(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
    }
  };

  return ({ nextPageUrl, state }: Props) => {
    const redirectUrl = location.pathname + location.search;

    if (!auth) {
      redirectToLogin(redirectUrl);
    } else if (nextPageUrl) {
      navigate(nextPageUrl, { state });
    }
  };
};

export const useAuthRedirectHandler = () => {
  const checkAuthAndRedirect = useAuthRedirect();

  const handleAuthRedirect = ({ nextPageUrl, state }: Props) => {
    checkAuthAndRedirect({ nextPageUrl, state });
  };

  return handleAuthRedirect;
};
