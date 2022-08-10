import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef, isMountedRef } from '@Utils/navigator';
import { AppNavigator } from '../../navigators';

const AppContainer = () => {
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default AppContainer;
