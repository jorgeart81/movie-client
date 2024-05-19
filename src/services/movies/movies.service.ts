import { moviesApi } from '@/api/moviesApi';

export class MoviesService {
  static getMovies = async () => {
    const { data } = await moviesApi.get('/movies');
    console.log({ data });
  };
}
