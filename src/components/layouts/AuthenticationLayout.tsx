import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { RoutePath } from '@/models';
import { useAuthStore } from '@/store';

export const AuthenticationLayout = () => {
  const navitate = useNavigate();

  const { status, stval, statusValidate, logout } = useAuthStore(state => ({
    status: state.status,
    stval: state.stval,
    statusValidate: state.statusValidate,
    logout: state.logout,
  }));

  useEffect(() => {
    const isStatusValid = statusValidate();
    
    if (!isStatusValid) logout();

    if (status === 'authorized' && stval) {
      navitate(RoutePath.DASHBOARD, {
        replace: true,
        unstable_viewTransition: true,
      });
      return;
    }
  }, [status, stval]);

  return <Outlet />;
};
