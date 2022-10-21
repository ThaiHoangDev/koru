import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, StatusBar, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import reducer from '@Containers/App/store/reducers';
import saga from '@Containers/App/store/sagas';
import { AppActions } from '@Containers/App/store/actions';
import LauchLogo from '@Components/iconSvg/LauchLogo';

const SplashContainer = () => {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  const dispatch = useDispatch();

  const initApp = useCallback(() => {
    dispatch(AppActions.initApp.request());
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <>
      <StatusBar barStyle={'default'} />
      <LinearGradient
        colors={['#A5D3CC', '#D9F7BE']}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <LauchLogo />
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashContainer;
