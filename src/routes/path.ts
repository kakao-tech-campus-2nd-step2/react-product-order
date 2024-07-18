export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  product: '/product/:productId',
  order: '/order/:orderId',
  myAccount: '/my-account',
  login: '/login',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  product: (productId: string) => RouterPath.product.replace(':productId', productId),
  order: (orderId: string) => RouterPath.order.replace(':orderId', orderId),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
};
