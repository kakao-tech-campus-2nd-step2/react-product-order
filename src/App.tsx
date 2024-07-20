import type { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';
import { AuthProvider } from './store/AuthProvider';
import { OrderHistoryProvider } from './store/OrderHistoryProvider';

import { MainLayout } from '@/components/Layout/MainLayout';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
import MyAccountPage from '@/pages/MyAccountPage';
import OrderPage from '@/pages/OrderPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import ThemePage from '@/pages/ThemePage';
import { ResetStyles } from '@/styles/reset';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { authToken } = useAuth();
  return <>{authToken ? children : <Navigate to="/login" replace={true} />}</>;
};

const App = () => {
  const methods = useForm();
  return (
    <>
      <ResetStyles />
      <FormProvider {...methods}>
        <AuthProvider>
          <OrderHistoryProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<MainLayout />}>
                <Route index path="/" element={<MainPage />} />
                <Route
                  path="/my-account"
                  element={
                    <ProtectedRoute>
                      <MyAccountPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/theme/:themeKey" element={<ThemePage />} />;
                <Route path="/products/:productId" element={<ProductDetailPage />} />;
                <Route path="/order" element={<OrderPage />} />;
              </Route>
            </Routes>
          </OrderHistoryProvider>
        </AuthProvider>
      </FormProvider>
    </>
  );
};
export default App;
