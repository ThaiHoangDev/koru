import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, StatusBar, Image, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { useInjectReducer } from '@Utils/injectReducer';
import { useInjectSaga } from '@Utils/injectSaga';

import reducer from '@Containers/App/store/reducers';
import saga from '@Containers/App/store/sagas';
import { AppActions } from '@Containers/App/store/actions';
import { colors, fontSizes } from '@Theme/index';

// assets

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
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        <Text style={styles.text}>KORU</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  text: {
    fontSize: fontSizes.xxl,
    color: colors.black,
  }
});

export default SplashContainer;
