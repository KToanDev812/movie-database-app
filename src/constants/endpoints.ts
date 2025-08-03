export const TMDB_ENDPOINTS = {
  // Movie endpoints
  MOVIES: {
    NOW_PLAYING: '/movie/now_playing',
    POPULAR: '/movie/popular',
    UPCOMING: '/movie/upcoming',
    TOP_RATED: '/movie/top_rated',
    DETAILS: (id: number) => `/movie/${id}`,
    CREDITS: (id: number) => `/movie/${id}/credits`,
    RECOMMENDATIONS: (id: number) => `/movie/${id}/recommendations`,
    SIMILAR: (id: number) => `/movie/${id}/similar`,
    VIDEOS: (id: number) => `/movie/${id}/videos`,
    IMAGES: (id: number) => `/movie/${id}/images`,
  },

  // Search endpoints
  SEARCH: {
    MOVIES: '/search/movie',
    MULTI: '/search/multi',
    PERSON: '/search/person',
  },

  // Genre endpoints
  GENRES: {
    MOVIE_LIST: '/genre/movie/list',
  },

  // Configuration endpoints
  CONFIG: {
    API: '/configuration',
    COUNTRIES: '/configuration/countries',
    LANGUAGES: '/configuration/languages',
  },

  // Account endpoints (optional)
  ACCOUNT: {
    DETAILS: '/account',
    FAVORITE_MOVIES: '/account/{account_id}/favorite/movies',
    WATCHLIST_MOVIES: '/account/{account_id}/watchlist/movies',
  },
} as const;
