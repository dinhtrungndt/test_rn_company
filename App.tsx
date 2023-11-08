import React from 'react';
import { SafeAreaView } from 'react-native';

// Screens
import JokeHome from './src/components/screens/JokeHome';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <JokeHome />
    </SafeAreaView>
  );
};

export default App;
