import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { RoutePath } from '@/models';
import { useAuthStore } from '@/store';

export const AuthenticationLayout = () => {
  const navitate = useNavigate();

  const { status, token, statusValidate, logout } = useAuthStore(state => ({
    status: state.status,
    token: state.token,
    statusValidate: state.statusValidate,
    logout: state.logout,
  }));

  useEffect(() => {
    const isStatusValid = statusValidate();
    
    if (!isStatusValid) logout();

    if (status === 'authorized') {
      navitate(RoutePath.DASHBOARD, {
        replace: true,
        unstable_viewTransition: true,
      });
      return;
    }
  }, [status, token]);

  return <Outlet />;
};
