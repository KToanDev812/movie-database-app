export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  video: boolean;
}

export interface TMDBMovieDetails extends TMDBMovie {
  runtime: number | null;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  homepage: string;
  imdb_id: string;
  genres: TMDBGenre[];
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  spoken_languages: TMDBSpokenLanguage[];
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface TMDBProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface TMDBSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  cast_id: number;
  credit_id: string;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
}

export interface TMDBCredits {
  id: number;
  cast: TMDBCastMember[];
  crew: TMDBCrewMember[];
}

export interface TMDBMovieListResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface TMDBErrorResponse {
  success: false;
  status_code: number;
  status_message: string;
}

// Application-specific types
export interface Movie extends TMDBMovie {
  // Additional fields for app-specific functionality
  isInWatchlist?: boolean;
  addedToWatchlistAt?: string;
}

export interface MovieDetails extends TMDBMovieDetails {
  credits?: TMDBCredits;
  recommendations?: TMDBMovie[];
  isInWatchlist?: boolean;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  originalError?: any;
}
