export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  product: '/products/:id',
  order: '/order',
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
  productsDetail: (goodsId: number | string) =>
    RouterPath.product.replace(':id', typeof goodsId === 'number' ? goodsId.toString() : goodsId),
};
