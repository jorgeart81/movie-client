import { Outlet, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store';
import { useEffect } from 'react';

export const AuthenticationLayout = () => {
  const navitate = useNavigate();
  const { status, token, getRefreshToken } = useAuthStore(state => ({
    status: state.status,
    token: state.token,
    getRefreshToken: state.getRefreshToken,
  }));

  useEffect(() => {
    if (!token) {
      getRefreshToken();
    }
    
    if (status === 'authorized') {
      navitate('/dashboard', { replace: true, unstable_viewTransition: true });
      return;
    }
  }, [status, token]);

  return <Outlet />;
};
