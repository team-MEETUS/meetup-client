import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import '@/styles/reset.scss';
import '@/index.scss';

import NotFound from '@/pages/not-found/NotFound.tsx';
import HomePage from '@/pages/home/HomePage.tsx';
import Footer from '@/components/footer/Footer.tsx';
import BottomNavigation from '@/components/common/bottom-navigation/BottomNavigation.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="container">
        <App />
        <Footer />
        <BottomNavigation />
      </div>
    ),
    errorElement: <NotFound />,
    children: [{ path: '/', element: <HomePage /> }],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
