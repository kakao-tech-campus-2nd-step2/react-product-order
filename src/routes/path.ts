export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  product: '/product/:productId',
  myAccount: '/my-account',
  login: '/login',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  product: (productId: number) => RouterPath.product.replace(':productId', productId.toString()),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
};
