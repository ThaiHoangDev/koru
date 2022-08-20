import React from 'react';

import SplashContainer from '@Containers/Splash';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = () => {
  return (
    <SafeAreaView edges={['left', 'right']}>
      <SplashContainer />
    </SafeAreaView>
  );
};

export default SplashScreen;
