import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Pressable, Platform } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigation, useRoute, ParamListBase, RouteProp } from '@react-navigation/native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';

// utils

// components by self
import TopNavigationBar from '@Navigators/topNavigation';
// assets

import { colors, fontFamily } from '@Theme/index';

import StartPairing from '@Components/iconSvg/pairing/StartPairing';
import TitleComp from '../components/TitleComp';
import { PairActions } from '../store/actions';

const PairYourPotContainer = () => {
  EspIdfProvisioningReactNative.create();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const route: RouteProp<ParamListBase> | any = useRoute();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => <TopNavigationBar {...p} isLeft />,
    });
  }, [navigation]);

  const scanFunc = useCallback(async () => {}, []);

  const handlePairing = () => {
    navigation.navigate('SelectBLT');
  };

  return (
    <View style={styles.root}>
      <View style={styles.txtContainer}>
        <TitleComp
          title={'_Pair your pot.'}
          subTitle={'Click the button on your pot. Like you see below.'}
          styleLayout={{ flex: 1 }}
        />
      </View>
      <Pressable style={{ flex: 2 }} onPress={handlePairing}>
        <StartPairing />
      </Pressable>
    </View>
  );
};

export default connect()(PairYourPotContainer);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtContainer: {
    flex: 1,
    marginTop: 20,
  },

  fontFamily: {
    fontFamily: fontFamily.Strawford,
  },
});
