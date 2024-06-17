import { redirect } from 'react-router-dom';

import { RoutePath } from '@/models';
import { useAuthStore } from '@/store';
import { cryptoAdapter } from '@/utils';

export async function authLoader() {
  const status = useAuthStore.getState().status;
  const stval = useAuthStore.getState().stval;
  const token = useAuthStore.getState().token;
  const getRefreshToken = useAuthStore.getState().getRefreshToken;
  const logout = useAuthStore.getState().logout;

  if (status !== 'authorized' || !stval) return redirect(RoutePath.LOGIN);

  try {
    const stvalDecode = await cryptoAdapter.decrypt(stval);
    if (status === 'authorized' && stvalDecode !== 'authorized') {
      logout();
      return redirect(RoutePath.LOGIN);
    }

    if (status === 'authorized' && !token) await getRefreshToken();
  } catch (error) {
    logout();
  }

  return null;
}
