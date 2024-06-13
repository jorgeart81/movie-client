import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { SotorageKey, type User } from '@/models';
import { AuthService } from '@/services';
import type { AuthStatus } from '../interfaces';

interface AuthState {
  user?: User;
  status: AuthStatus;
  token?: string;
  refreshToken?: string;
}

interface Actions {
  login: (email: string, password: string) => void;
  getRefreshToken: () => void;
  logout: () => void;
}

const initialState: AuthState = {
  status: 'unauthorized',
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
  getRefreshToken: async () => {
    try {
      const { accessToken, refreshToken } = await AuthService.refreshToken();
      set({ token: accessToken, refreshToken, status: 'authorized' });
    } catch (error) {
      set(initialState);
      if (error instanceof Error) throw error.message;
    }
  },
  logout: async () => {
    try {
      const { ok } = await AuthService.logout();
      if (ok) set(initialState);
    } catch (error) {
      if (error instanceof Error) throw error.message;
    }
  },
});

export const useAuthStore = create<AuthState & Actions>()(
  devtools(
    persist(storeApi, {
      name: SotorageKey.AUTH,
      partialize: state => ({ status: state.status }),
    })
  )
);
