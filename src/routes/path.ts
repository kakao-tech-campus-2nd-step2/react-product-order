export const RouterPath = {
  root: '/',
  home: '/',
  myAccount: '/my-account',
  login: '/login',
  notFound: '*',
  theme: '/theme/:themeKey',
  detail: '/detail/:productId',
  order: '/order/:orderId',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
  detail: (productId: string) => RouterPath.detail.replace(':productId', productId),
  order: (orderId: string) => RouterPath.order.replace(':orderId', orderId),
};
