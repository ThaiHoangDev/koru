import React from 'react';

import SplashContainer from '@Containers/Splash';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = () => {
  return (
    <SafeAreaView edges={['left', 'right']} style={{ flex: 1 }}>
      <SplashContainer />
    </SafeAreaView>
  );
};

export default SplashScreen;
