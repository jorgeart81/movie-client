import { Navigate, Outlet } from 'react-router-dom';

import { RoutePath, sidemenuRoutes } from '@/models';
import { useAuthStore } from '@/store/auth/auth.store';
import { Sidemenu } from '../sidemenu';
import { useEffect } from 'react';

export const AppLayout = () => {
  const { status, token, user, getRefreshToken, logout } = useAuthStore(
    state => ({
      status: state.status,
      token: state.token,
      user: state.user,
      getRefreshToken: state.getRefreshToken,
      logout: state.logout,
    })
  );

  useEffect(() => {
    if (!token) {
      getRefreshToken();
    }
  }, [token]);

  return (
    <>
      {status === 'authorized' && token ? (
        <div className='bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-800 selection:bg-blue-600 selection:text-white'>
          <div className='flex relative'>
            <Sidemenu
              username={user?.name}
              role={user?.role}
              routes={sidemenuRoutes}
              handleLogout={logout}
            />

            <main className='w-full p-4'>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to={RoutePath.ROOT} />
      )}
    </>
  );
};
