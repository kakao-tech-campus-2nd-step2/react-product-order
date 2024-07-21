export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  products: '/products/:productId',
  order: '/products/:productId/order',
  myAccount: '/my-account',
  login: '/login',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  product: (productId: number) => RouterPath.products.replace(':productId', productId.toString()),
  order: (productId: number) => RouterPath.order.replace(':productId', productId.toString()),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
};
