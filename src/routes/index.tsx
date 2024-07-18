import { useEffect } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';
import { RouterPath } from './path';
import { Layout } from '@/components/features/Layout';
import { HomePage } from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import { MyAccountPage } from '@/pages/MyAccount';
import OrderPage from '@/pages/Order';
import ProductPage from '@/pages/Product';
import { ThemePage } from '@/pages/Theme';

const RedirectToHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(RouterPath.home);
  }, [navigate]);
  return null;
};

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
        path: RouterPath.product,
        element: <ProductPage />,
      },
      {
        path: RouterPath.orders,
        element: <OrderPage />,
        errorElement: <RedirectToHome />,
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
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
