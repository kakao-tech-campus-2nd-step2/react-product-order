export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  productDetail: '/products/:productId',
  myAccount: '/my-account',
  login: '/login',
  order: '/order',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  productDetail: (productId: string) => RouterPath.productDetail.replace(':productId', productId),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
  order: (productId: string) => `${RouterPath.order}/${productId}`,
};
