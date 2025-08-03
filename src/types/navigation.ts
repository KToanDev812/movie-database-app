import { Movie } from './movie';

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  MovieDetail: { movie: Movie };
  Watchlist: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  WatchlistTab: undefined;
};
