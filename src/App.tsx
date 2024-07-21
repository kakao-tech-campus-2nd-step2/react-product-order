import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api/instance';
import { AuthProvider } from './provider/Auth';
import { Routes } from './routes';

import { ChakraBaseProvider } from '@chakra-ui/react';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraBaseProvider>
          <Routes />
        </ChakraBaseProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
