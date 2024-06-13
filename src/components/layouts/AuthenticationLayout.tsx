import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store';
import { RoutePath } from '@/models';

export const AuthenticationLayout = () => {
  const navitate = useNavigate();
  const { status, token } = useAuthStore(state => ({
    status: state.status,
    token: state.token,
    getRefreshToken: state.getRefreshToken,
  }));

  useEffect(() => {
    if (status === 'authorized' && token) {
      navitate(RoutePath.DASHBOARD, {
        replace: true,
        unstable_viewTransition: true,
      });
      return;
    }
  }, [status, token]);

  return <Outlet />;
};
