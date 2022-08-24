import React, { createRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import { navigationRef, isMountedRef } from '@Utils/navigator';
import { AppNavigator } from '../../navigators';
import { AppState, NativeModules, Platform } from 'react-native';

const AppContainer = () => {
  // useEffect(() => {
  //   isMountedRef.current = true;

  //   return () => {
  //     isMountedRef.current = false;
  //   };
  // }, []);

  useEffect(() => {
    const subAppState = AppState.addEventListener('change', async nextAppState => {
      console.log('NETWORK1______', nextAppState);
      if (Platform.OS === 'ios' && nextAppState === 'active') {
        let newNetInfo = await NativeModules.RNCNetInfo.getCurrentState('wifi');
        //your code here
        console.log('NETWORK______', nextAppState);
      }
    });
    const unsubNetState = NetInfo.addEventListener(state => {
      //your code here
      console.log(state, 'NetState______');
    });
    return () => {
      if (subAppState) {
        subAppState.remove();
      }
      unsubNetState();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default AppContainer;
