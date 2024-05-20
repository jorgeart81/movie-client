import { AuthenticatedLayout } from '@/components/layouts';
import { Home } from '@/components/pages';
import { createBrowserRouter } from 'react-router-dom';

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
]);
