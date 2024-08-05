import { createBrowserRouter } from 'react-router-dom';

import App from '@/App.tsx';
import BottomNavigation from '@/components/common/bottom-navigation/BottomNavigation.tsx';
import CrewPage from '@/pages/crew/CrewPage';
import CrewRegisterLocation from '@/pages/crew/crew-register/CrewRegisterLocation';
import CrewRegisterPage from '@/pages/crew/crew-register/CrewRegisterPage';
import HomePage from '@/pages/home/HomePage.tsx';
import NotFound from '@/pages/not-found/NotFound.tsx';
import TestPage from '@/pages/test/TestPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="container">
        <App />
        <BottomNavigation />
      </div>
    ),
    errorElement: <NotFound />,
    children: [
      { path: '', element: <HomePage /> },
      {
        path: 'crew',
        children: [
          { path: '', element: <CrewPage /> },
          {
            path: 'register',
            children: [
              { path: '', element: <CrewRegisterPage /> },
              { path: 'location', element: <CrewRegisterLocation /> },
            ],
          },
        ],
      },
      { path: 'test', element: <TestPage /> },
    ],
  },
]);

export default router;
