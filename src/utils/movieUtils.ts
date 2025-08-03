/**
 * Utility functions for movie-related operations
 */
import { Movie } from '../types';

/**
 * Formats a date string to a readable format
 * @param dateString - ISO date string
 * @param format - Format type ('short' | 'long')
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  format: 'short' | 'long' = 'short',
): string => {
  if (!dateString) {
    return 'Unknown';
  }

  const date = new Date(dateString);

  if (format === 'short') {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Extracts year from date string
 * @param dateString - ISO date string
 * @returns Year as number
 */
export const getYearFromDate = (dateString: string): number => {
  return new Date(dateString).getFullYear();
};

/**
 * Formats runtime in minutes to hours and minutes
 * @param runtime - Runtime in minutes
 * @returns Formatted runtime string
 */
export const formatRuntime = (runtime: number): string => {
  if (!runtime) {
    return 'Unknown';
  }

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }
  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};

/**
 * Calculates percentage score from vote average
 * @param voteAverage - Vote average (0-10)
 * @returns Percentage score
 */
export const calculatePercentageScore = (voteAverage: number): number => {
  return Math.round(voteAverage * 10);
};

/**
 * Truncates text to specified length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Sorts movies based on criteria
 * @param movies - Array of movies
 * @param sortBy - Sort criteria
 * @param order - Sort order
 * @returns Sorted movies array
 */
export const sortMovies = (
  movies: Movie[],
  sortBy: string,
  order: 'asc' | 'desc' = 'desc',
): Movie[] => {
  const sortedMovies = [...movies].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'release_date':
        aValue = new Date(a.release_date);
        bValue = new Date(b.release_date);
        break;
      case 'vote_average':
        aValue = a.vote_average;
        bValue = b.vote_average;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return order === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return sortedMovies;
};

/**
 * Filters movies based on search query
 * @param movies - Array of movies
 * @param searchQuery - Search query string
 * @returns Filtered movies array
 */
export const filterMoviesBySearch = (
  movies: Movie[],
  searchQuery: string,
): Movie[] => {
  if (!searchQuery.trim()) {
    return movies;
  }

  const query = searchQuery.toLowerCase().trim();

  return movies.filter(
    movie =>
      movie.title.toLowerCase().includes(query) ||
      movie.overview.toLowerCase().includes(query),
  );
};
