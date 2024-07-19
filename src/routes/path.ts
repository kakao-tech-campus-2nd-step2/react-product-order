export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  myAccount: '/my-account',
  login: '/login',
  productDetail: '/product/:productId',
  checkout: '/checkout/:productId',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  productDetail: (productId: string) => RouterPath.productDetail.replace(':productId', productId),
  checkout: (productId: string) => RouterPath.checkout.replace(':productId', productId),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
};
