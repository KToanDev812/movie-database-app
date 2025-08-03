/**
 * TMDB API configuration and endpoints
 *
 * IMPORTANT: Replace TMDB_READ_ACCESS_TOKEN with your actual token
 * DO NOT commit your actual API token to version control
 */

// Environment variables - these should be set in your .env file
const TMDB_READ_ACCESS_TOKEN =
  process.env.TMDB_READ_ACCESS_TOKEN || 'YOUR_TMDB_READ_ACCESS_TOKEN_HERE';

export const API_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
  BACKDROP_BASE_URL: 'https://image.tmdb.org/t/p/w780',
  ORIGINAL_IMAGE_URL: 'https://image.tmdb.org/t/p/original',

  // API Headers
  HEADERS: {
    Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },

  // API Endpoints
  ENDPOINTS: {
    NOW_PLAYING: '/movie/now_playing',
    POPULAR: '/movie/popular',
    UPCOMING: '/movie/upcoming',
    TOP_RATED: '/movie/top_rated',
    MOVIE_DETAILS: (id: number) => `/movie/${id}`,
    MOVIE_CREDITS: (id: number) => `/movie/${id}/credits`,
    MOVIE_RECOMMENDATIONS: (id: number) => `/movie/${id}/recommendations`,
    SEARCH_MOVIES: '/search/movie',
    ACCOUNT_DETAILS: '/account',
  },

  // Request parameters
  DEFAULT_PARAMS: {
    language: 'en-US',
    region: 'US',
  },
} as const;

// Validate API token
export const validateApiToken = (): boolean => {
  return (
    TMDB_READ_ACCESS_TOKEN !== 'YOUR_TMDB_READ_ACCESS_TOKEN_HERE' &&
    TMDB_READ_ACCESS_TOKEN.length > 0
  );
};
