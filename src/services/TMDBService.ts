import { API_CONFIG, validateApiToken } from '../config/api';
import {
  TMDBMovie,
  TMDBMovieDetails,
  TMDBCredits,
  TMDBMovieListResponse,
  TMDBErrorResponse,
  ApiError,
} from '../types/tmdb';

export class TMDBService {
  /**
   * Generic API request method with comprehensive error handling
   */
  private static async makeRequest<T>(
    endpoint: string,
    params: Record<string, string | number> = {},
  ): Promise<T> {
    // Validate API token before making requests
    if (!validateApiToken()) {
      throw new ApiError({
        message:
          'TMDB API token is not configured. Please add your Read Access Token.',
        statusCode: 401,
      });
    }

    try {
      const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);

      // Add default parameters
      Object.entries(API_CONFIG.DEFAULT_PARAMS).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });

      // Add custom parameters
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as TMDBErrorResponse;
        throw new ApiError({
          message:
            errorData.status_message ||
            `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status,
          originalError: errorData,
        });
      }

      return data as T;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new ApiError({
          message: 'Network error. Please check your internet connection.',
          originalError: error,
        });
      }

      // Handle other errors
      throw new ApiError({
        message: 'An unexpected error occurred while fetching data.',
        originalError: error,
      });
    }
  }

  /**
   * Get now playing movies
   */
  static async getNowPlayingMovies(
    page: number = 1,
  ): Promise<TMDBMovieListResponse> {
    return this.makeRequest<TMDBMovieListResponse>(
      API_CONFIG.ENDPOINTS.NOW_PLAYING,
      { page },
    );
  }

  /**
   * Get popular movies
   */
  static async getPopularMovies(
    page: number = 1,
  ): Promise<TMDBMovieListResponse> {
    return this.makeRequest<TMDBMovieListResponse>(
      API_CONFIG.ENDPOINTS.POPULAR,
      { page },
    );
  }

  /**
   * Get upcoming movies
   */
  static async getUpcomingMovies(
    page: number = 1,
  ): Promise<TMDBMovieListResponse> {
    return this.makeRequest<TMDBMovieListResponse>(
      API_CONFIG.ENDPOINTS.UPCOMING,
      { page },
    );
  }

  /**
   * Get top rated movies
   */
  static async getTopRatedMovies(
    page: number = 1,
  ): Promise<TMDBMovieListResponse> {
    return this.makeRequest<TMDBMovieListResponse>(
      API_CONFIG.ENDPOINTS.TOP_RATED,
      { page },
    );
  }

  /**
   * Get movie details by ID
   */
  static async getMovieDetails(movieId: number): Promise<TMDBMovieDetails> {
    return this.makeRequest<TMDBMovieDetails>(
      API_CONFIG.ENDPOINTS.MOVIE_DETAILS(movieId),
    );
  }

  /**
   * Get movie credits (cast and crew)
   */
  static async getMovieCredits(movieId: number): Promise<TMDBCredits> {
    return this.makeRequest<TMDBCredits>(
      API_CONFIG.ENDPOINTS.MOVIE_CREDITS(movieId),
    );
  }

  /**
   * Get movie recommendations
   */
  static async getMovieRecommendations(
    movieId: number,
    page: number = 1,
  ): Promise<TMDBMovieListResponse> {
    return this.makeRequest<TMDBMovieListResponse>(
      API_CONFIG.ENDPOINTS.MOVIE_RECOMMENDATIONS(movieId),
      { page },
    );
  }

  /**
   * Search movies by query
   */
  static async searchMovies(
    query: string,
    page: number = 1,
  ): Promise<TMDBMovieListResponse> {
    if (!query.trim()) {
      return {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      };
    }

    return this.makeRequest<TMDBMovieListResponse>(
      API_CONFIG.ENDPOINTS.SEARCH_MOVIES,
      { query: query.trim(), page },
    );
  }

  /**
   * Get movies by category with unified interface
   */
  static async getMoviesByCategory(
    category: 'now_playing' | 'popular' | 'upcoming' | 'top_rated',
    page: number = 1,
  ): Promise<TMDBMovieListResponse> {
    switch (category) {
      case 'now_playing':
        return this.getNowPlayingMovies(page);
      case 'popular':
        return this.getPopularMovies(page);
      case 'upcoming':
        return this.getUpcomingMovies(page);
      case 'top_rated':
        return this.getTopRatedMovies(page);
      default:
        throw new ApiError({
          message: `Invalid category: ${category}`,
          statusCode: 400,
        });
    }
  }

  /**
   * Get full movie details with credits and recommendations
   */
  static async getFullMovieDetails(movieId: number): Promise<{
    details: TMDBMovieDetails;
    credits: TMDBCredits;
    recommendations: TMDBMovie[];
  }> {
    try {
      const [details, credits, recommendationsResponse] = await Promise.all([
        this.getMovieDetails(movieId),
        this.getMovieCredits(movieId),
        this.getMovieRecommendations(movieId).catch(
          () => ({ results: [] } as TMDBMovieListResponse),
        ),
      ]);

      return {
        details,
        credits,
        recommendations: recommendationsResponse.results || [],
      };
    } catch (error) {
      // If any of the main requests fail, still return what we can
      const details = await this.getMovieDetails(movieId);
      return {
        details,
        credits: { id: movieId, cast: [], crew: [] },
        recommendations: [],
      };
    }
  }
}
