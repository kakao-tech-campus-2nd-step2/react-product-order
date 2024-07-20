export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  detail: '/products/:productId',
  order: '/products/:productId/order',
  myAccount: '/my-account',
  login: '/login',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
  detail: (productId: string) => RouterPath.detail.replace(':productId', productId),
  order: (productId: string) => RouterPath.order.replace(':productId', productId),
};
