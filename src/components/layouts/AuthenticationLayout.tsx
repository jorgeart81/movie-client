import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store';
import { RoutePath } from '@/models';

export const AuthenticationLayout = () => {
  const navitate = useNavigate();
  const { status, getRefreshToken } = useAuthStore(state => ({
    status: state.status,
    getRefreshToken: state.getRefreshToken,
  }));

  useEffect(() => {
    if (status === 'pending') getRefreshToken();

    if (status === 'authorized') {
      navitate(RoutePath.DASHBOARD, {
        replace: true,
        unstable_viewTransition: true,
      });
      return;
    }
  }, [status]);

  return <Outlet />;
};
