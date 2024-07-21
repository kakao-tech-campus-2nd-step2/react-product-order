export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  myAccount: '/my-account',
  login: '/login',
  notFound: '*',
  products: '/products/:productId/detail',
  payment: '/products/:productId/payment',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
  products: (productId: number | string) => RouterPath.products.replace(':productId', productId.toString()),
  payment: (productId: number | string) => RouterPath.payment.replace(':productId', productId.toString()),
};
