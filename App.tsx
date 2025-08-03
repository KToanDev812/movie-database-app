import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import WatchlistScreen from './src/screens/WatchlistScreen';
import { WatchlistProvider } from './src/context';
import { StatusBar } from 'react-native';
import { HomeIcon, WatchListIcon } from '~/components/common';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from '~/constants';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function WatchlistStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: COLORS.darkBlue,
          paddingTop: 10,
          height: 55,
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: () => <HomeIcon />
        }}
      />
      <Tab.Screen
        name="WatchlistTab"
        component={WatchlistStack}
        options={{
          tabBarIcon: () => <WatchListIcon />
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <WatchlistProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" />
          <TabNavigator />
        </NavigationContainer>
      </WatchlistProvider>
    </SafeAreaProvider>
  );
}