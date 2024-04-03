import React from 'react';
import { HomeScreen } from './screens/Home';
import { StatusBar, View } from 'react-native';

export default function App() {
    return (
    <View>
      <HomeScreen/>
      <StatusBar theme="auto" />
    </View>
  );
}
