import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import { Movie } from '../types';
import { ChevronRight } from '~/components/common';
import LOGO_IMG from '~/assets/images/Logo.png'
import { COLORS } from '~/constants';
import { MovieCard } from '~/components/movie';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface HomeScreenProps {
  navigation: any;
}

const sortOptions = [
  {
    value: 0,
    label: 'By alphabetical order',
  },
  {
    value: 1,
    label: 'By rating',
  },
  {
    value: 2,
    label: 'By release date',
  }
]

const categoryOptions = [
  {
    value: 0,
    label: 'Now Playing',
  },
  {
    value: 1,
    label: 'Upcoming',
  },
  {
    value: 2,
    label: 'Popular',
  }
]

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Now Playing');
  const [movies, setMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  // Mock data for demonstration
  const mockMovies: Movie[] = [
    {
      id: 1,
      title: 'Barbie',
      poster_path: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
      release_date: '2023-07-19',
      overview:
        'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.',
      vote_average: 7.4,
      genre_ids: [35, 12, 14],
      backdrop_path: '/ctmA4XjeQkyKnuSyzqh7LZQX2pJ.jpg',
    },
    {
      id: 2,
      title: 'The Flash',
      poster_path: '/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
      release_date: '2023-06-13',
      overview:
        'When his attempt to save his family inadvertently alters the future, Barry Allen becomes trapped in a reality.',
      vote_average: 6.8,
      genre_ids: [28, 12, 878],
      backdrop_path: '/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
    },
    {
      id: 3,
      title: 'The Little Mermaid',
      poster_path: '/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg',
      release_date: '2023-05-18',
      overview:
        "The youngest of King Triton's daughters, and the most defiant, Ariel longs to find out more about the world beyond the sea.",
      vote_average: 7.2,
      genre_ids: [10751, 14, 10749],
      backdrop_path: '/7CNCv9uhqdwK7MX2aAkKC8XuCHv.jpg',
    },
  ];

  useEffect(() => {
    setMovies(mockMovies);
  }, [selectedCategory]);

  const renderMovieItem = ({ item }: { item: any }) => (
    <MovieCard
      movie={item}
      onPress={() => navigation.navigate('MovieDetail', { movie: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={LOGO_IMG}
          style={{ width: 80, height: 58 }}
        />
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.buttonText}>{selectedCategory}</Text>
          <ChevronRight />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.buttonText}>Sort by</Text>
          <ChevronRight />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          style={styles.moviesList}
          ListFooterComponent={() => (
            <TouchableOpacity style={styles.loadMoreButton}>
              <Text style={{ color: COLORS.background, fontSize: 16, fontWeight: '600' }}>Load More</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3
  },
  searchButton: {
    backgroundColor: COLORS.gray,
    padding: 16,
    borderRadius: 99,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  loadMoreButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
  },
  moviesList: {
    flex: 1,
  },
});

export default HomeScreen;
