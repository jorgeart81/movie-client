import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { AuthStatus } from '../interfaces';
import { SotorageKey, type User } from '@/models';

interface AuthState {
  user: User;
  status: AuthStatus;
  token?: string;
}

interface Actions {}

const storeApi: StateCreator<
  AuthState & Actions,
  [['zustand/devtools', never]]
> = set => ({
  user: {
    id: '',
    name: '',
    email: '',
    role: '',
  },
  status: 'unauthorized',
  token: undefined,

  // Actions
});

export const useAuthStore = create<AuthState & Actions>()(
  devtools(persist(storeApi, { name: SotorageKey.AUTH }))
);
