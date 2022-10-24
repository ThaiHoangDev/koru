import React from 'react';

import IntroContainer from '@Containers/Intro';
import { SafeAreaView } from 'react-native-safe-area-context';

const IntroScreen = () => {
  return (
    <SafeAreaView edges={['left', 'right']} style={{ flex: 1 }}>
      <IntroContainer />
    </SafeAreaView>
  );
};

export default IntroScreen;
