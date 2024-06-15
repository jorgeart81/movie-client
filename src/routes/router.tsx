import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/components/layouts';
import { AuthenticationLayout } from '@/components/layouts/AuthenticationLayout';
import { authLoader } from './loaders';
import { CircleSpinner } from '@/components/spinners';

const Home = lazy(() => import('@/components/pages/Home'));
const Profile = lazy(() => import('@/components/pages/Profile'));
const Settings = lazy(() => import('@/components/pages/Settings'));
const NotFound = lazy(() => import('@/components/pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/auth' />,
  },
  {
    path: '/auth',
    element: <AuthenticationLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='login' />,
      },
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
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/app',
    element: <AppLayout />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <Navigate to='dashboard' />,
      },
      {
        index: true,
        path: 'dashboard',
        element: (
          <Suspense fallback={<CircleSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<CircleSpinner />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<CircleSpinner />}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
]);
