import React from 'react';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <WatchlistProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <TabNavigator />
      </NavigationContainer>
    </WatchlistProvider>
  );
}