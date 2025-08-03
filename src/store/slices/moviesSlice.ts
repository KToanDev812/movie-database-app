import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TMDBService } from '../../services/TMDBService';
import {
  TMDBMovie,
  TMDBMovieDetails,
  TMDBCredits,
  ApiError,
} from '../../types/tmdb';

// Async thunks for API calls
export const fetchMoviesByCategory = createAsyncThunk(
  'movies/fetchByCategory',
  async (
    {
      category,
      page = 1,
    }: {
      category: 'now_playing' | 'popular' | 'upcoming' | 'top_rated';
      page?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await TMDBService.getMoviesByCategory(category, page);
      return {
        category,
        movies: response.results,
        page,
        totalPages: response.total_pages,
      };
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue({
        message: apiError.message,
        statusCode: apiError.statusCode,
      });
    }
  },
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchDetails',
  async (movieId: number, { rejectWithValue }) => {
    try {
      const response = await TMDBService.getFullMovieDetails(movieId);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue({
        message: apiError.message,
        statusCode: apiError.statusCode,
      });
    }
  },
);

export const searchMovies = createAsyncThunk(
  'movies/search',
  async (
    { query, page = 1 }: { query: string; page?: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await TMDBService.searchMovies(query, page);
      return {
        query,
        movies: response.results,
        page,
        totalPages: response.total_pages,
      };
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue({
        message: apiError.message,
        statusCode: apiError.statusCode,
      });
    }
  },
);

interface MoviesState {
  // Movie lists by category
  nowPlaying: TMDBMovie[];
  popular: TMDBMovie[];
  upcoming: TMDBMovie[];
  topRated: TMDBMovie[];

  // Search results
  searchResults: TMDBMovie[];
  searchQuery: string;

  // Movie details
  movieDetails: Record<
    number,
    {
      details: TMDBMovieDetails;
      credits: TMDBCredits;
      recommendations: TMDBMovie[];
    }
  >;

  // Loading states
  loading: {
    nowPlaying: boolean;
    popular: boolean;
    upcoming: boolean;
    topRated: boolean;
    search: boolean;
    details: boolean;
  };

  // Error states
  errors: {
    nowPlaying: string | null;
    popular: string | null;
    upcoming: string | null;
    topRated: string | null;
    search: string | null;
    details: string | null;
  };

  // Pagination
  pagination: {
    nowPlaying: { currentPage: number; totalPages: number };
    popular: { currentPage: number; totalPages: number };
    upcoming: { currentPage: number; totalPages: number };
    topRated: { currentPage: number; totalPages: number };
    search: { currentPage: number; totalPages: number };
  };
}

const initialState: MoviesState = {
  nowPlaying: [],
  popular: [],
  upcoming: [],
  topRated: [],
  searchResults: [],
  searchQuery: '',
  movieDetails: {},
  loading: {
    nowPlaying: false,
    popular: false,
    upcoming: false,
    topRated: false,
    search: false,
    details: false,
  },
  errors: {
    nowPlaying: null,
    popular: null,
    upcoming: null,
    topRated: null,
    search: null,
    details: null,
  },
  pagination: {
    nowPlaying: { currentPage: 0, totalPages: 0 },
    popular: { currentPage: 0, totalPages: 0 },
    upcoming: { currentPage: 0, totalPages: 0 },
    topRated: { currentPage: 0, totalPages: 0 },
    search: { currentPage: 0, totalPages: 0 },
  },
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSearchResults: state => {
      state.searchResults = [];
      state.searchQuery = '';
      state.errors.search = null;
    },
    clearError: (state, action: PayloadAction<keyof MoviesState['errors']>) => {
      state.errors[action.payload] = null;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: builder => {
    // Fetch movies by category
    builder
      .addCase(fetchMoviesByCategory.pending, (state, action) => {
        const category = action.meta.arg.category;
        const loadingKey =
          category === 'now_playing'
            ? 'nowPlaying'
            : category === 'top_rated'
            ? 'topRated'
            : category;
        state.loading[loadingKey as keyof typeof state.loading] = true;
        state.errors[loadingKey as keyof typeof state.errors] = null;
      })
      .addCase(fetchMoviesByCategory.fulfilled, (state, action) => {
        const { category, movies, page, totalPages } = action.payload;
        const stateKey =
          category === 'now_playing'
            ? 'nowPlaying'
            : category === 'top_rated'
            ? 'topRated'
            : category;
        const loadingKey = stateKey as keyof typeof state.loading;

        if (page === 1) {
          state[
            stateKey as keyof Pick<
              MoviesState,
              'nowPlaying' | 'popular' | 'upcoming' | 'topRated'
            >
          ] = movies;
        } else {
          const currentMovies =
            state[
              stateKey as keyof Pick<
                MoviesState,
                'nowPlaying' | 'popular' | 'upcoming' | 'topRated'
              >
            ];
          state[
            stateKey as keyof Pick<
              MoviesState,
              'nowPlaying' | 'popular' | 'upcoming' | 'topRated'
            >
          ] = [...currentMovies, ...movies];
        }

        state.loading[loadingKey] = false;
        state.pagination[loadingKey as keyof typeof state.pagination] = {
          currentPage: page,
          totalPages,
        };
      })
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
        const category = action.meta.arg.category;
        const loadingKey =
          category === 'now_playing'
            ? 'nowPlaying'
            : category === 'top_rated'
            ? 'topRated'
            : category;
        state.loading[loadingKey as keyof typeof state.loading] = false;
        state.errors[loadingKey as keyof typeof state.errors] =
          action.payload?.message || 'Failed to fetch movies';
      });

    // Search movies
    builder
      .addCase(searchMovies.pending, state => {
        state.loading.search = true;
        state.errors.search = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        const { query, movies, page, totalPages } = action.payload;
        state.searchQuery = query;

        if (page === 1) {
          state.searchResults = movies;
        } else {
          state.searchResults = [...state.searchResults, ...movies];
        }

        state.loading.search = false;
        state.pagination.search = { currentPage: page, totalPages };
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading.search = false;
        state.errors.search =
          action.payload?.message || 'Failed to search movies';
      });

    // Fetch movie details
    builder
      .addCase(fetchMovieDetails.pending, state => {
        state.loading.details = true;
        state.errors.details = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        const { details, credits, recommendations } = action.payload;
        state.movieDetails[details.id] = { details, credits, recommendations };
        state.loading.details = false;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading.details = false;
        state.errors.details =
          action.payload?.message || 'Failed to fetch movie details';
      });
  },
});

export const { clearSearchResults, clearError, setSearchQuery } =
  moviesSlice.actions;
export default moviesSlice.reducer;
