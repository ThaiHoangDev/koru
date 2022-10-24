import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { StyleSheet } from 'react-native';

// utils

// components by self

// assets

import { colors, fontFamily } from '@Theme/index';
import TitleComp from '../components/TitleComp';
import LoaderAnimationProgress from '@Components/lottie/loader';
import Startpairing2 from '@Components/iconSvg/pairing/Startpairing2';

import { makeSelectIsRequesting, makeSelectNetworks, makeSelectUuid } from '../store/selectors';
import { PropsScreen } from '@Interfaces/app';

interface Iprops extends PropsScreen {
  isLoading: boolean;
  netWorks: any;
}

const Searching = ({ isLoading, netWorks }: Iprops) => {
  const width = useRef(new Animated.Value(100)).current;
  const height = useRef(new Animated.Value(100)).current;

  const w = width.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const h = height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useLayoutEffect(() => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: 69,
        delay: 100,
        duration: 1000,
        isInteraction: true,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(width, {
        toValue: 59,
        delay: 100,
        duration: 1000,
        isInteraction: true,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.txtContainer}>
        <TitleComp title={'_Searching '} subTitle={'your pot'} />
      </View>
      <View style={{ marginTop: 40, alignItems: 'center' }}>
        <Animated.View style={{ width: w, height: h }}>
          <Startpairing2 />
        </Animated.View>
        <LoaderAnimationProgress />
      </View>
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsRequesting(),
  uuid: makeSelectUuid(),
  netWorks: makeSelectNetworks(),
});
export default connect(mapStateToProps)(Searching);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtContainer: {},

  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
});
