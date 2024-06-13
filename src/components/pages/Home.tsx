import { useEffect } from 'react';

import { useMoviesStore } from '@/store/movies/movies.store';
import { MovieCard } from '../cards';
import { formattedDate } from '@/utils';

const Home = () => {
  const getMovies = useMoviesStore(state => state.getMovies);
  const movies = useMoviesStore(state => state.movies);

  useEffect(() => {
    getMovies().catch(console.log);
  }, []);

  return (
    <div>
      <div className='flex flex-wrap gap-3'>
        {movies.map(movie => {
          return (
            <MovieCard
              key={movie.id}
              title={movie.title}
              description={movie.description}
              image={`https://image.tmdb.org/t/p/w300/${movie.image}`}
              mpaaRating={movie.mpaaRating}
              releaseDate={formattedDate(movie.releaseDate)}
              runtime={movie.runtime}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
