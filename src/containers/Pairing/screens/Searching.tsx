import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { StyleSheet } from 'react-native';

// utils

// components by self

// assets

import { colors, fontFamily } from '@Theme/index';
import TitleComp from '../components/TitleComp';
import LoaderAnimationProgress from '@Components/lottie/loader';
import Startpairing2 from '@Components/iconSvg/pairing/Startpairing2';

const Searching = () => {
  const width = useRef(new Animated.Value(109)).current;
  const height = useRef(new Animated.Value(100)).current;

  const w = width.interpolate({
    inputRange: [0, 0.6],
    outputRange: [0, 0.6],
  });
  const h = height.interpolate({
    inputRange: [0, 0.6],
    outputRange: [0, 0.6],
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: 69,
        delay: 10,
        duration: 1000,
        isInteraction: true,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(width, {
        toValue: 59,
        delay: 10,
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

export default Searching;

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
