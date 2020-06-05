import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import { AppLoading } from 'expo';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import AppProvider from './src/hooks';

import Routes from './src/routes';

YellowBox.ignoreWarnings(['State updates from the useState()']);

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <AppProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </AppProvider>
  );
};

export default App;
