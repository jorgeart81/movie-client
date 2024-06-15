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
  getRefreshToken: () => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  statusValidate: () => boolean;
}

const initialState: AuthState = {
  status: 'unauthorized',
};

const storeApi: StateCreator<
  AuthState & Actions,
  [['zustand/devtools', never]]
> = (set, get) => ({
  ...initialState,

  // Actions
  getRefreshToken: async () => {
    try {
      const { accessToken, refreshToken } = await AuthService.refreshToken();
      set({ token: accessToken, refreshToken, status: 'authorized' });
    } catch (error) {
      const err = error as Error;
      err.message === 'Unauthorized'
        ? set({ status: 'unauthorized' })
        : set({ status: 'pending' });
      if (error instanceof Error) throw error.message;
    }
  },
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

  logout: async () => {
    try {
      const { ok } = await AuthService.logout();
      if (ok) set(initialState);
    } catch (error) {
      if (error instanceof Error) throw error.message;
    }
  },
  statusValidate: () => {
    const validAuthStatuses: AuthStatus[] = [
      'authorized',
      'unauthorized',
      'pending',
    ];
    if (!validAuthStatuses.includes(get().status)) {
      set(initialState);
      return false;
    }

    return true;
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
