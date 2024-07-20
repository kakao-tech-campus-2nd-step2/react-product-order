export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  productDetail: '/product/:productId',
  payment: '/payment',
  myAccount: '/my-account',
  login: '/login',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  ProductDetail: (productId: string) => RouterPath.productDetail.replace(':productId', productId),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
};
