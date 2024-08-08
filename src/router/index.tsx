import React, { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import App from '@/App.tsx';
import BottomNavigation from '@/components/common/bottom-navigation/BottomNavigation.tsx';
import LoadingSpinner from '@/components/common/loading-spinner/LoadingSpinner';

import CrewRegisterInterestBig from '@/pages/crew/crew-register/CrewRegisterInterestBig';

const CrewPage = React.lazy(() => import('@/pages/crew/CrewPage'));
const CrewRegisterInterestSmall = React.lazy(
  () => import('@/pages/crew/crew-register/CrewRegisterInterestSmall'),
);
const CrewRegisterLocation = React.lazy(
  () => import('@/pages/crew/crew-register/CrewRegisterLocation'),
);
const CrewRegisterPage = React.lazy(
  () => import('@/pages/crew/crew-register/CrewRegisterPage'),
);
const HomePage = React.lazy(() => import('@/pages/home/HomePage.tsx'));
const NotFound = React.lazy(() => import('@/pages/not-found/NotFound.tsx'));
const TestPage = React.lazy(() => import('@/pages/test/TestPage.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="container">
        <App />
        <BottomNavigation />
      </div>
    ),
    errorElement: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'crew',
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <CrewPage />
              </Suspense>
            ),
          },
          {
            path: 'register',
            children: [
              {
                path: 'interest-big',
                element: <CrewRegisterInterestBig />,
              },
              {
                path: 'interest-small',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <CrewRegisterInterestSmall />
                  </Suspense>
                ),
              },
              {
                path: 'register',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <CrewRegisterPage />
                  </Suspense>
                ),
              },
              {
                path: 'location',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <CrewRegisterLocation />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: 'test',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <TestPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
