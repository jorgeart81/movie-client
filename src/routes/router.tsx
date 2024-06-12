import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { AuthenticatedLayout } from '@/components/layouts';
import { Home } from '@/components/pages';

const Login = lazy(() => import('@/components/pages/auth/Login'));

export const router = createBrowserRouter([
  {
    path: '',
    element: <h1 className='text-3xl font-bold underline'>Hello world!</h1>,
  },
  {
    path: '/dashboard',
    element: <AuthenticatedLayout />,
    children: [{ path: '', element: <Home /> }],
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: (
          <Suspense>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
]);
