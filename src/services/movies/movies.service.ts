import { moviesApi } from '@/api/moviesApi';
import { AxiosError } from 'axios';
import type { Movie } from '../interfaces';

export class MoviesService {
  static getMovies = async (): Promise<Movie[]> => {
    try {
      const { data } = await moviesApi.get('/movies');
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.error(error);
      throw new Error('Unable to register');
    }
  };
}
