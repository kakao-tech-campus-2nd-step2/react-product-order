import { useAuthRedirect } from '@/hooks/useAuthRedirect';

interface RedirectOptions {
  nextPageUrl: string;
  state?: any;
}

export const useAuthRedirectHandler = () => {
  const checkAuthAndRedirect = useAuthRedirect();

  const handleAuthRedirect = ({ nextPageUrl, state }: RedirectOptions) => {
    checkAuthAndRedirect({ nextPageUrl, state });
  };

  return handleAuthRedirect;
};
