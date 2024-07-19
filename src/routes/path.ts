export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  myAccount: '/my-account',
  products: '/products/:productKey',
  order: '/order',
  login: '/login',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  product: (productKey: string) => RouterPath.products.replace(':productKey', productKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
};
