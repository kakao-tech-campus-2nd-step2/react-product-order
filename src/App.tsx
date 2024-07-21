import { AuthProvider } from '@/auth/AuthProvider';
import { RequireAuth } from '@/auth/RequireAuth';
import { Layout } from '@/components/features/Layout';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { MyAccount } from '@/pages/MyAccount';
import { Product } from '@/pages/Product';
import { Order } from '@/pages/Order';
import { Theme } from '@/pages/Theme';
import { RouterPath } from '@/routes';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    path: RouterPath.root,
    element: <Layout />,
    children: [
      { path: RouterPath.home, element: <Home /> },
      { path: RouterPath.theme, element: <Theme /> },
      {
        path: RouterPath.myAccount,
        element: (
          <RequireAuth>
            <MyAccount />
          </RequireAuth>
        ),
      },
      { path: RouterPath.product, element: <Product /> },
      { path: RouterPath.order, element: <Order /> },
      {
        path: RouterPath.notFound,
        element: <Navigate to={RouterPath.home} />,
      },
    ],
  },
  { path: RouterPath.login, element: <Login /> },
]);

export default App;
