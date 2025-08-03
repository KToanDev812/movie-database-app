export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
  genre_ids: number[];
  backdrop_path: string;
  runtime?: number;
  status?: string;
  original_language?: string;
}

export interface Genre {
  id: number;
  name: string;
}
