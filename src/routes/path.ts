export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  myAccount: '/my-account',
  login: '/login',
  notFound: '*',
  product: '/product/:productId',
  order: '/order/:productId',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  product: (productId: string) => RouterPath.product.replace(':productId', productId),
  order: (productId: string) => RouterPath.order.replace(':productId', productId),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
};
