import { redirect } from 'react-router-dom';

import { RoutePath } from '@/models';
import { useAuthStore } from '@/store';

export function authLoader() {
  const status = useAuthStore.getState().status;
  const statusValidate = useAuthStore.getState().statusValidate;

  if (status !== 'authorized' || !statusValidate()) {
    return redirect(RoutePath.LOGIN);
  }

  return null;
}
