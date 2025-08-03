/**
 * Movie categories and related constants
 */
export interface MovieCategory {
  id: string;
  name: string;
  endpoint: string;
  icon: string;
  description: string;
}

export const MOVIE_CATEGORIES: MovieCategory[] = [
  {
    id: 'now_playing',
    name: 'Now Playing',
    endpoint: '/movie/now_playing',
    icon: 'play-circle-outline',
    description: 'Movies currently in theaters',
  },
  {
    id: 'popular',
    name: 'Popular',
    endpoint: '/movie/popular',
    icon: 'trending-up',
    description: 'Most popular movies right now',
  },
  {
    id: 'upcoming',
    name: 'Upcoming',
    endpoint: '/movie/upcoming',
    icon: 'schedule',
    description: 'Movies coming soon to theaters',
  },
  {
    id: 'top_rated',
    name: 'Top Rated',
    endpoint: '/movie/top_rated',
    icon: 'star',
    description: 'Highest rated movies of all time',
  },
];

export const SORT_OPTIONS = [
  { id: 'popularity', name: 'Popularity', value: 'popularity.desc' },
  { id: 'rating', name: 'Rating', value: 'vote_average.desc' },
  { id: 'release_date', name: 'Release Date', value: 'release_date.desc' },
  { id: 'title', name: 'Title', value: 'title.asc' },
  { id: 'added_date', name: 'Date Added', value: 'addedAt.desc' },
] as const;

export const FILTER_OPTIONS = [
  { id: 'all', name: 'All Movies' },
  { id: 'rating_high', name: 'High Rated (7+)' },
  { id: 'rating_medium', name: 'Medium Rated (5-7)' },
  { id: 'recent', name: 'Recent (2020+)' },
  { id: 'classic', name: 'Classic (Before 2000)' },
] as const;

export type MovieCategoryId = (typeof MOVIE_CATEGORIES)[number]['id'];
export type SortOptionId = (typeof SORT_OPTIONS)[number]['id'];
export type FilterOptionId = (typeof FILTER_OPTIONS)[number]['id'];
