import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Movie } from '../../types';
import { COLORS, LAYOUT } from '../../constants';
import { formatDate, truncateText } from '../../utils/movieUtils';
import { XIcon } from '../common';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieCardProps {
  /** Movie data to display */
  movie: Movie;
  /** Callback when card is pressed */
  onPress: (movie: Movie) => void;
  /** Whether to show remove button */
  showRemoveButton?: boolean;
  /** Callback when remove button is pressed */
  onRemove?: (movieId: number) => void;
  /** Card layout variant */
  variant?: 'default' | 'compact';
}

/**
 * Reusable movie card component with customizable layout and actions
 */
export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  showRemoveButton = false,
  onRemove,
  variant = 'default',
}) => {
  const handlePress = () => onPress(movie);
  const handleRemove = () => onRemove?.(movie.id);

  const imageUri = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        variant === 'compact' && styles.compactContainer,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Movie Poster */}
      <View style={styles.posterContainer}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.poster}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.poster, styles.placeholderPoster]}/>
        )}
      </View>

      {/* Movie Information */}
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie.title}
        </Text>

        <Text style={styles.movieDate}>{formatDate(movie.release_date)}</Text>

        <Text
          style={styles.movieOverview}
          numberOfLines={variant === 'compact' ? 2 : 3}
        >
          {truncateText(movie.overview, variant === 'compact' ? 100 : 150)}
        </Text>
      </View>

      {/* Remove Button */}
      {showRemoveButton && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemove}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <XIcon />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: LAYOUT.borderRadius.md,
    marginBottom: LAYOUT.spacing.md,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  compactContainer: {
    marginBottom: LAYOUT.spacing.sm,
  },
  posterContainer: {
    width: 80,
    height: 120,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  placeholderPoster: {
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieInfo: {
    flex: 1,
    padding: LAYOUT.spacing.md,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: LAYOUT.spacing.xs,
  },
  movieDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: LAYOUT.spacing.sm,
  },
  movieOverview: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 18,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: LAYOUT.spacing.sm,
  },
  ratingText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: LAYOUT.spacing.xs,
    fontWeight: '500',
  },
  removeButton: {
    position: 'absolute',
    top: LAYOUT.spacing.sm,
    right: LAYOUT.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: LAYOUT.borderRadius.sm,
    padding: LAYOUT.spacing.xs,
  },
});
