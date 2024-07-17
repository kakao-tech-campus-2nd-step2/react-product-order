
export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  myAccount: '/my-account',
  login: '/login',
  product: '/products/:productId',
  order: '/order/:productId',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
  product: (productId: string) => RouterPath.product.replace(':productId', productId),
  order: (productId: string, redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return RouterPath.order.replace(':productId', productId) + `?redirect=${encodeURIComponent(currentRedirect)}`;
  },
};
