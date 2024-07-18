export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  myAccount: '/my-account',
  productsDetail: '/products/:productId',
  order: '/order',
  login: '/login',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
  productsDetail: (goodsId: number | string) =>
    RouterPath.productsDetail.replace(
      ':productId',
      typeof goodsId === 'number' ? goodsId.toString() : goodsId,
    ),
};
