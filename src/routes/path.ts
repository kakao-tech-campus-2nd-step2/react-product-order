export const RouterPath = {
  root: '/',
  home: '/',
  theme: '/theme/:themeKey',
  myAccount: '/my-account',
  productDetail: '/product/:id',
  login: '/login',
  notFound: '*',
  order: '/order',
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(':themeKey', themeKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
  productDetail: (id: number) => RouterPath.productDetail.replace(':id', id.toString()),
};
