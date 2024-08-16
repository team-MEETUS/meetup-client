/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from 'react';

import { createBrowserRouter, useLocation } from 'react-router-dom';

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
const CrewUpdatePage = React.lazy(
  () => import('@/pages/crew/crew-register/CrewUpdatePage'),
);
const CrewBoardDetailPage = React.lazy(
  () => import('@/pages/crew/board/CrewBoardDetailPage'),
);
const CrewBoardPage = React.lazy(
  () => import('@/pages/crew/board/CrewBoardPage'),
);
const CrewBoardRegisterPage = React.lazy(
  () => import('@/pages/crew/board/CrewBoardRegisterPage'),
);
const LoginPage = React.lazy(() => import('@/pages/user/login/LoginPage'));
const HomePage = React.lazy(() => import('@/pages/home/HomePage.tsx'));
const NotFound = React.lazy(() => import('@/pages/not-found/NotFound.tsx'));
const TestPage = React.lazy(() => import('@/pages/test/TestPage.tsx'));

const Layout = () => {
  const location = useLocation();
  const hideBottomNav = location.pathname.startsWith('/crew');

  return (
    <div className="container">
      <App />
      {!hideBottomNav && <BottomNavigation />}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
        path: '/user',
        children: [
          {
            path: 'login',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <LoginPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'crew',
        children: [
          {
            path: ':crewId/home',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <CrewPage />
              </Suspense>
            ),
          },
          {
            path: ':crewId/board',
            children: [
              {
                path: '',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <CrewBoardPage />
                  </Suspense>
                ),
              },
              {
                path: ':boardId',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <CrewBoardDetailPage />
                  </Suspense>
                ),
              },
              {
                path: 'register',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <CrewBoardRegisterPage />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: ':crewId/album',
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <CrewPage />
              </Suspense>
            ),
          },
          {
            path: ':crewId/chat',
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

                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <CrewRegisterInterestBig />
                  </Suspense>
                ),
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
                path: 'update',
                element: (
                  <Suspense fallback={<LoadingSpinner />}>
                    <CrewUpdatePage />
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
