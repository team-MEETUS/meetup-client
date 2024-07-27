import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import '@/styles/reset.scss';
import '@/index.scss';

import BottomNavigation from '@/components/common/bottom-navigation/BottomNavigation.tsx';
import Footer from '@/components/footer/Footer.tsx';
import HomePage from '@/pages/home/HomePage.tsx';
import MeetingPage from '@/pages/meeting/MeetingPage.tsx';
import NotFound from '@/pages/not-found/NotFound.tsx';

import App from './App.tsx';

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
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/meeting', element: <MeetingPage /> },
    ],
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
