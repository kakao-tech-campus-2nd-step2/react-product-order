export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  products: '/products/:productKey',
  myAccount: '/my-account',
  login: '/login',
  notFound: '*',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  products: (productKey: string) => RouterPath.products.replace(':productKey', productKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
};
