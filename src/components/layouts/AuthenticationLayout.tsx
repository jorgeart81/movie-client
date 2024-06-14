import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store';
import { RoutePath } from '@/models';

export const AuthenticationLayout = () => {
  const navitate = useNavigate();

  const { status, getRefreshToken, statusValidate, logout } = useAuthStore(
    state => ({
      status: state.status,
      getRefreshToken: state.getRefreshToken,
      statusValidate: state.statusValidate,
      logout: state.logout,
    })
  );

  useEffect(() => {
    const isStatusValid = statusValidate();

    if (!isStatusValid) logout();
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
