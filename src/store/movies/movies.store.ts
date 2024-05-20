import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { Movie } from '../interfaces';
import { MoviesService } from '@/services';

interface MoviesState {
  movies: Movie[];
  isLoading: boolean;
}

interface Actions {
  getMovies: () => Promise<void>;
}

const storeApi: StateCreator<
  MoviesState & Actions,
  [['zustand/devtools', never]]
> = set => ({
  movies: [],
  isLoading: false,

  // Actions
  getMovies: async () => {
    try {
      const movies = await MoviesService.getMovies();
      set({ movies });
    } catch (error) {
      if (error instanceof Error) throw error.message;
    }
  },
});

export const useMoviesStore = create<MoviesState & Actions>()(
  devtools(persist(storeApi, { name: 'test' }))
);
