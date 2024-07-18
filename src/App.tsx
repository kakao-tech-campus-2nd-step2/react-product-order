import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api/instance';
import { AuthProvider } from './provider/Auth';
import { GiftProvider } from './provider/Auth'; // 추가된 import
import { Routes } from './routes';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GiftProvider>
          <Routes />
        </GiftProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
