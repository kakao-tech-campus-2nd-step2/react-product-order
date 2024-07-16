export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  productDetail: '/products/:productId/detail',
  productOption: '/products/:productId/options',
  myAccount: '/my-account',
  login: '/login',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  productDetail: (productId: number) => RouterPath.productDetail.replace(':productId', productId.toString()),
  productOption: (productId: number) => RouterPath.productDetail.replace(':productId', productId.toString()),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
};
