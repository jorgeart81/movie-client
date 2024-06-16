import { useCallback, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { RoutePath, sidemenuRoutes } from '@/models';
import { useAuthStore } from '@/store/auth/auth.store';
import { Sidemenu } from '../sidemenu';

export const AppLayout = () => {
  const refreshInterval = useRef<NodeJS.Timeout>();
  const navigation = useNavigate();
  const { status, token, user, getRefreshToken, logout, statusValidate } =
    useAuthStore(state => ({
      status: state.status,
      token: state.token,
      user: state.user,
      getRefreshToken: state.getRefreshToken,
      logout: state.logout,
      statusValidate: state.statusValidate,
    }));

  const handleRefresh = useCallback(
    (start: boolean) => {
      if (start) {
        refreshInterval.current = setInterval(() => {
          getRefreshToken();
        }, 600000);
        return;
      }

      clearInterval(refreshInterval.current);
      refreshInterval.current = undefined;
    },
    [refreshInterval.current]
  );

  const handleLogout = () => {
    logout();
    handleRefresh(false);
  };

  useEffect(() => {
    if (!token) navigation(RoutePath.LOGIN);
    if (status === 'unauthorized' || !statusValidate()) {
      logout();
      navigation(RoutePath.LOGIN);
    }

    handleRefresh(status === 'authorized');

    return () => {
      handleRefresh(false);
    };
  }, [status, token]);

  return (
    <>
      <div className='bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-800 selection:bg-blue-600 selection:text-white'>
        <div className='flex relative'>
          <Sidemenu
            username={user?.name}
            role={user?.role}
            routes={sidemenuRoutes}
            handleLogout={handleLogout}
          />

          <main className='w-full p-4'>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
