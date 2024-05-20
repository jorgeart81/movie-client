export interface GetMoviesResponse {
  data: Movie[];
}

export interface Movie {
  id: number;
  title: string;
  releaseDate: Date;
  runtime: number;
  mpaaRating: string;
  description: string;
  image: string;
}
