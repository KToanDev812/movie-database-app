import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useWatchlist } from '../context/';
import { BackIcon, WatchListIcon } from '~/components/common';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieDetailScreenProps {
  navigation: any;
  route: any;
}

const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({ navigation, route }) => {
  const { movie } = route.params;
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const handleWatchlistToggle = () => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <BackIcon width={50} height={50} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </Text>
        </View>

        <View style={styles.movieInfo}>
          <Image
            source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
            style={styles.poster}
          />

          <View style={styles.details}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>PG13</Text>
            </View>

            <Text style={styles.releaseInfo}>
              {formatDate(movie.release_date)} (SG) • 1h 54m
            </Text>
            <Text style={styles.genre}>Comedy, Adventure, Fantasy</Text>
            <Text style={styles.status}>Status: Released</Text>
            <Text style={styles.language}>Original Language: English</Text>
          </View>
        </View>

        <View style={styles.scoreSection}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreNumber}>{Math.round(movie.vote_average * 10)}</Text>
          </View>
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreTitle}>User Score</Text>
            <Text style={styles.directorName}>Greta Gerwig</Text>
            <Text style={styles.directorRole}>Director, Writer</Text>
            <Text style={styles.writerName}>Noah Baumbach</Text>
            <Text style={styles.writerRole}>Writer</Text>
          </View>
        </View>

        <Text style={styles.tagline}>She's everything. He's just Ken.</Text>

        <View style={styles.overviewSection}>
          <Text style={styles.overviewTitle}>Overview</Text>
          <Text style={styles.overviewText}>{movie.overview}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.watchlistButton,
            isInWatchlist(movie.id) && styles.watchlistButtonActive,
          ]}
          onPress={handleWatchlistToggle}
        >
          <WatchListIcon
            width={50}
            height={50}
          />
          <Text style={styles.watchlistButtonText}>
            {isInWatchlist(movie.id) ? 'Remove From Watchlist' : 'Add To Watchlist'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BCD4',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  movieInfo: {
    flexDirection: 'row',
    padding: 16,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  ratingBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  ratingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  releaseInfo: {
    color: 'white',
    fontSize: 14,
    marginBottom: 4,
  },
  genre: {
    color: 'white',
    fontSize: 14,
    marginBottom: 4,
  },
  status: {
    color: 'white',
    fontSize: 14,
    marginBottom: 4,
  },
  language: {
    color: 'white',
    fontSize: 14,
  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scoreNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreInfo: {
    flex: 1,
  },
  scoreTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  directorName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  directorRole: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginBottom: 4,
  },
  writerName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  writerRole: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  tagline: {
    color: 'white',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 16,
  },
  overviewSection: {
    padding: 16,
  },
  overviewTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  overviewText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  watchlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 8,
  },
  watchlistButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  watchlistButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default MovieDetailScreen;
