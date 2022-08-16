import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, StatusBar, Text, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import reducer from '@Containers/App/store/reducers';
import saga from '@Containers/App/store/sagas';
import { AppActions } from '@Containers/App/store/actions';

import {WIDTH, HEIGHT} from '@Constants/app'
import { colors, fontSizes, fontFamily } from '@Theme/index';

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
      <View style={styles.container}>
        <ImageBackground source={require('@Assets/splash-background/splash_xxxh.png')}  style={styles.splash}>
           <Text style={styles.text}>KORU</Text>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splash:{
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
    height: HEIGHT
  },
  text: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.xxl,
    color: colors.white,
  }
});

export default SplashContainer;
