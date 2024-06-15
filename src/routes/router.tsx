import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/components/layouts';
import { AuthenticationLayout } from '@/components/layouts/AuthenticationLayout';
import { authLoader } from './loaders';

const Home = lazy(() => import('@/components/pages/Home'));
const Profile = lazy(() => import('@/components/pages/Profile'));
const Settings = lazy(() => import('@/components/pages/Settings'));

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthenticationLayout />,
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
  {
    path: '/*',
    element: <Navigate to={'/auth/login'} />,
  },
  {
    path: '/',
    element: <AppLayout />,
    loader: authLoader,
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
]);
