import React, { createRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import { navigationRef, isMountedRef } from '@Utils/navigator';
import { AppNavigator } from '../../navigators';
import { AppState, NativeModules, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HEIGHT, WIDTH } from '@Constants/app';
import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import reducer from '@Containers/MQTT/store/reducers';
import saga from '@Containers/MQTT/store/sagas';

const AppContainer = () => {
  // useEffect(() => {
  //   isMountedRef.current = true;

  //   return () => {
  //     isMountedRef.current = false;
  //   };
  // }, []);
  useInjectReducer({ key: 'mqtt', reducer });
  useInjectSaga({ key: 'mqtt', saga });

  useEffect(() => {
    const subAppState = AppState.addEventListener('change', async nextAppState => {
      // console.log('NETWORK1______', nextAppState);
      if (Platform.OS === 'ios' && nextAppState === 'active') {
        let newNetInfo = await NativeModules.RNCNetInfo.getCurrentState('wifi');
        //your code here
        // console.log('NETWORK______', nextAppState);
      }
    });
    const unsubNetState = NetInfo.addEventListener(state => {
      //your code here
      // console.log(state, 'NetState______');
    });
    return () => {
      if (subAppState) {
        subAppState.remove();
      }
      unsubNetState();
    };
  }, []);

  return (
    <SafeAreaProvider
      initialMetrics={{
        insets: { top: 0, bottom: 0, right: 0, left: 0 },
        frame: { x: WIDTH, y: HEIGHT, width: WIDTH, height: HEIGHT },
      }}>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppContainer;
