export const RouterPath = {
  root: "/",
  home: "/",
  theme: "/theme/:themeKey",
  products: "/products/:productId",
  order: "/order",
  myAccount: "/my-account",
  login: "/login",
  notFound: "*",
};

export const getDynamicPath = {
  theme: (themeKey: string) => RouterPath.theme.replace(":themeKey", themeKey),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
  products: (productId: string) => RouterPath.products.replace(":productId", productId),
};
