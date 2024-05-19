import { Outlet } from 'react-router-dom';

import { sidemenuRoutes } from '@/routes/route';
import { useAuthStore } from '@/store/auth/auth.store';
import { Sidemenu } from '../sidemenu';

export const AuthenticatedLayout = () => {
  const { user } = useAuthStore(state => ({
    user: state.user,
  }));

  return (
    <>
      <div className='bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-800 selection:bg-blue-600 selection:text-white'>
        <div className='flex relative'>
          <Sidemenu
            username={user.name}
            role={user.role}
            routes={sidemenuRoutes}
          />

          <main className='w-full p-4'>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
