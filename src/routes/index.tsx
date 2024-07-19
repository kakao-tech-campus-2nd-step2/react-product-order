import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { Layout } from '@/components/features/Layout';
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import { MyAccountPage } from '@/pages/MyAccount';
import OrderPage from '@/pages/Order';
import ProductDetailPage from '@/pages/Product';
import { ThemePage } from '@/pages/Theme';

import { PrivateRoute } from './components/PrivateRoute';
import { RouterPath } from './path';

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: <Layout />,
    children: [
      {
        path: RouterPath.home,
        element: <HomePage />,
      },
      {
        path: RouterPath.theme,
        element: <ThemePage />,
      },
      {
        path: RouterPath.myAccount,
        element: <PrivateRoute />,
        children: [
          {
            path: RouterPath.myAccount,
            element: <MyAccountPage />,
          },
        ],
      },
      {
        path: RouterPath.notFound,
        element: <Navigate to={RouterPath.home} />,
      },
    ],
  },
  {
    path: RouterPath.login,
    element: <LoginPage />,
  },
  {
    path: RouterPath.productDetail,
    element: <ProductDetailPage />
  },
  {
    path: RouterPath.order,
    element: <OrderPage />
  }
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
