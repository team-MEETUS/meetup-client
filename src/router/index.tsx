import { createBrowserRouter } from 'react-router-dom';

import App from '@/App.tsx';
import BottomNavigation from '@/components/common/bottom-navigation/BottomNavigation.tsx';
import HomePage from '@/pages/home/HomePage.tsx';
import MeetingPage from '@/pages/meeting/MeetingPage.tsx';
import MeetingRegisterPage from '@/pages/meeting/MeetingRegisterPage';
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
        path: 'meeting',
        children: [
          { path: '', element: <MeetingPage /> },
          { path: 'register', element: <MeetingRegisterPage /> },
        ],
      },
      { path: 'test', element: <TestPage /> },
    ],
  },
]);

export default router;
