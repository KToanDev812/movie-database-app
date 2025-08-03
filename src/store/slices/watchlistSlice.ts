import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMDBMovie } from '../../types';

interface WatchlistItem extends TMDBMovie {
  addedAt: string;
}

interface WatchlistState {
  items: WatchlistItem[];
  sortBy: 'title' | 'release_date' | 'vote_average' | 'addedAt';
  sortOrder: 'asc' | 'desc';
  filterBy: 'all' | 'rating' | 'year';
}

const initialState: WatchlistState = {
  items: [],
  sortBy: 'addedAt',
  sortOrder: 'desc',
  filterBy: 'all',
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<TMDBMovie>) => {
      const movie = action.payload;
      const existingIndex = state.items.findIndex(
        (item: TMDBMovie) => item.id === movie.id,
      );

      if (existingIndex === -1) {
        state.items.push({
          ...movie,
          addedAt: new Date().toISOString(),
        });
      }
    },

    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item: TMDBMovie) => item.id !== action.payload,
      );
    },

    setSortBy: (state, action: PayloadAction<WatchlistState['sortBy']>) => {
      state.sortBy = action.payload;
    },

    setSortOrder: (
      state,
      action: PayloadAction<WatchlistState['sortOrder']>,
    ) => {
      state.sortOrder = action.payload;
    },

    setFilterBy: (state, action: PayloadAction<WatchlistState['filterBy']>) => {
      state.filterBy = action.payload;
    },

    clearWatchlist: state => {
      state.items = [];
    },

    // Bulk operations
    addMultipleToWatchlist: (state, action: PayloadAction<TMDBMovie[]>) => {
      const newMovies = action.payload.filter(
        movie => !state.items.some((item: TMDBMovie) => item.id === movie.id),
      );

      const watchlistItems = newMovies.map(movie => ({
        ...movie,
        addedAt: new Date().toISOString(),
      }));

      state.items.push(...watchlistItems);
    },

    removeMultipleFromWatchlist: (state, action: PayloadAction<number[]>) => {
      const idsToRemove = new Set(action.payload);
      state.items = state.items.filter(
        (item: TMDBMovie) => !idsToRemove.has(item.id),
      );
    },
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  setSortBy,
  setSortOrder,
  setFilterBy,
  clearWatchlist,
  addMultipleToWatchlist,
  removeMultipleFromWatchlist,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;

// Selectors
export const selectWatchlistItems = (state: { watchlist: WatchlistState }) =>
  state.watchlist.items;
export const selectIsInWatchlist =
  (movieId: number) => (state: { watchlist: WatchlistState }) =>
    state.watchlist.items.some(item => item.id === movieId);
export const selectWatchlistCount = (state: { watchlist: WatchlistState }) =>
  state.watchlist.items.length;
