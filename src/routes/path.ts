export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  myAccount: '/my-account',
  productsDetail: '/products/',
  login: '/login',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
  // 여기에 productsDetail 주소 관련 하여 들어가야함
};
