import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/components/layouts';
import { AuthenticationLayout } from '@/components/layouts/AuthenticationLayout';

const Home = lazy(() => import('@/components/pages/Home'));

export const router = createBrowserRouter([
  {
    path: '/*',
    element: <Navigate to={'/auth/login'} />,
  },
  {
    path: '/dashboard',
    element: <AppLayout />,
    children: [{ path: '', element: <Home /> }],
  },
  {
    path: '/auth',
    element:<AuthenticationLayout/>,
    children: [
      {
        path: 'login',
        lazy: () =>
          import('@/components/pages/auth/Login').then(module => ({
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <module.default />
              </Suspense>
            ),
          })),
      },
    ],
  },
]);
