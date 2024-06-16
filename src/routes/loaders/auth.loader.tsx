import { redirect } from 'react-router-dom';

import { RoutePath } from '@/models';
import { useAuthStore } from '@/store';

export async function authLoader() {
  const status = useAuthStore.getState().status;
  const token = useAuthStore.getState().token;
  const getRefreshToken = useAuthStore.getState().getRefreshToken;

  if (status === 'authorized' && !token) await getRefreshToken();

  if (status !== 'authorized') return redirect(RoutePath.LOGIN);

  return null;
}
