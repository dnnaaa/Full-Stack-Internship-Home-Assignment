'use client';

import React from 'react';
import theme from '@/styles/theme';
import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FeedbackProvider } from '../context/FeedbackContext';

const Providers = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <FeedbackProvider>{children}</FeedbackProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
