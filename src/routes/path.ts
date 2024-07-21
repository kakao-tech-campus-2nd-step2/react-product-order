export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  product: '/products/:productId',
  order: '/:productId/order',
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
  productsDetail: (productId: number | string) =>
    RouterPath.product.replace(
      ':productId',
      typeof productId === 'number' ? productId.toString() : productId,
    ),
  order: (productId: number | string) =>
    RouterPath.order.replace(
      ':productId',
      typeof productId === 'number' ? productId.toString() : productId,
    ),
};
