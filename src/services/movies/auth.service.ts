import { AxiosError } from 'axios';

import { moviesApi } from '@/api/moviesApi';
import type { LoginRequest, LoginResponse } from '../interfaces/auth';

export class AuthService {
  static login = async (request: LoginRequest): Promise<LoginResponse> => {
    try {
      const { data } = await moviesApi.post('/authenticate', request);
      console.log(data);
      return data;
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
