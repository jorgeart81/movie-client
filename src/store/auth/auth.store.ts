import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { AuthStatus } from '../interfaces';
import { SotorageKey, type User } from '@/models';
import { AuthService } from '@/services';

interface AuthState {
  user?: User;
  status: AuthStatus;
  token?: string;
  refreshToken?: string;
}

interface Actions {
  login: (email: string, password: string) => void;
}

const initialState: AuthState = {
  status: 'authorized',
};

const storeApi: StateCreator<
  AuthState & Actions,
  [['zustand/devtools', never]]
> = set => ({
  ...initialState,

  // Actions
  login: async (email: string, password: string) => {
    try {
      const { accessToken, refreshToken } = await AuthService.login({
        email,
        password,
      });
      set({ token: accessToken, refreshToken, status: 'authorized' });
    } catch (error) {
      set(initialState);
      if (error instanceof Error) throw error.message;
    }
  },
});

export const useAuthStore = create<AuthState & Actions>()(
  devtools(persist(storeApi, { name: SotorageKey.AUTH }))
);
