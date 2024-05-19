import { useEffect } from 'react';
import { MoviesService } from './services';

function App() {
  useEffect(() => {
    MoviesService.getMovies().then();
  }, []);

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
    </>
  );
}

export default App;
