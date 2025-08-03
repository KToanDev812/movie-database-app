import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { TMDBMovie } from '../../types/tmdb';

// Base selectors
export const selectMoviesState = (state: RootState) => state.movies;
export const selectWatchlistState = (state: RootState) => state.watchlist;

// Movie list selectors
export const selectNowPlayingMovies = createSelector(
  [selectMoviesState],
  movies => movies.nowPlaying,
);

export const selectPopularMovies = createSelector(
  [selectMoviesState],
  movies => movies.popular,
);

export const selectUpcomingMovies = createSelector(
  [selectMoviesState],
  movies => movies.upcoming,
);

export const selectTopRatedMovies = createSelector(
  [selectMoviesState],
  movies => movies.topRated,
);

export const selectSearchResults = createSelector(
  [selectMoviesState],
  movies => movies.searchResults,
);

// Loading selectors
export const selectMoviesLoading = createSelector(
  [selectMoviesState],
  movies => movies.loading,
);

export const selectIsAnyMovieLoading = createSelector(
  [selectMoviesLoading],
  loading => Object.values(loading).some(Boolean),
);

// Error selectors
export const selectMoviesErrors = createSelector(
  [selectMoviesState],
  movies => movies.errors,
);

export const selectHasAnyError = createSelector([selectMoviesErrors], errors =>
  Object.values(errors).some(error => error !== null),
);

// Movie details selectors
export const selectMovieDetails = createSelector(
  [selectMoviesState],
  movies => movies.movieDetails,
);

export const selectMovieDetailsById = (movieId: number) =>
  createSelector([selectMovieDetails], movieDetails => movieDetails[movieId]);

// Watchlist selectors
export const selectWatchlistItems = createSelector(
  [selectWatchlistState],
  watchlist => watchlist.items,
);

export const selectWatchlistCount = createSelector(
  [selectWatchlistItems],
  items => items.length,
);

export const selectIsInWatchlist = (movieId: number) =>
  createSelector([selectWatchlistItems], items =>
    items.some(item => item.id === movieId),
  );

// Combined selectors
export const selectMoviesWithWatchlistStatus = createSelector(
  [selectPopularMovies, selectWatchlistItems],
  (movies, watchlistItems) => {
    const watchlistIds = new Set(watchlistItems.map(item => item.id));
    return movies.map(movie => ({
      ...movie,
      isInWatchlist: watchlistIds.has(movie.id),
    }));
  },
);

// Search selectors
export const selectSearchQuery = createSelector(
  [selectMoviesState],
  movies => movies.searchQuery,
);

export const selectIsSearchMode = createSelector(
  [selectSearchQuery],
  query => query.length > 0,
);

// Pagination selectors
export const selectMoviesPagination = createSelector(
  [selectMoviesState],
  movies => movies.pagination,
);

export const selectPaginationByCategory = (category: string) =>
  createSelector(
    [selectMoviesPagination],
    pagination => pagination[category as keyof typeof pagination],
  );
