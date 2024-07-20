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

  const checkAuthAndRedirect = ({ nextPageUrl, state }: Props) => {
    if (!auth) {
      const redirectUrl = location.pathname + location.search;
      if (window.confirm('로그인이 필요한 메뉴입니다. 로그인 페이지로 이동하시겠습니까?')) {
        navigate(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
      }
    } else {
      if (nextPageUrl) {
        navigate(nextPageUrl, { state });
      }
    }
  };

  return checkAuthAndRedirect;
};
