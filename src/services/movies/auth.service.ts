import { AxiosError } from 'axios';

import { moviesApi } from '@/api/moviesApi';
import type { LoginRequest, LoginResponse } from '../interfaces/auth';

export class AuthService {
  static login = async (request: LoginRequest): Promise<LoginResponse> => {
    try {
      const { data } = await moviesApi.post('/authenticate', request);
      return data;
    } catch (error) {
      errorHandler(error);
    }
  };

  static refreshToken = async (): Promise<LoginResponse> => {
    try {
      const { data } = await moviesApi.get('/authenticate/refresh');
      return data;
    } catch (error) {
      errorHandler(error);
    }
  };

  static logout = async () => {
    try {
      const data = await moviesApi.get('/authenticate/logout', {
        signal: AbortSignal.timeout(5000),
      });
      return { ok: data.status === 202 };
    } catch (error) {
      errorHandler(error);
    }
  };
}

function errorHandler(error: unknown): never {
  if (error instanceof AxiosError) {
    console.error(error.response?.data);
    throw new Error(error.response?.data);
  }

  console.error(error);
  throw new Error('Unable to authenticate');
}
