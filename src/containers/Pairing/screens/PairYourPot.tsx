import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Pressable, Platform } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigation, useRoute, ParamListBase, RouteProp } from '@react-navigation/native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';

// utils
import { StepProps } from '@Containers/Auth/interfaces';
import { makeSelectStepPairing } from '../store/selectors';

// components by self

// assets

import { colors, fontFamily } from '@Theme/index';

import StartPairing from '@Components/iconSvg/pairing/StartPairing';
import TitleComp from '../components/TitleComp';
import { PairActions } from '../store/actions';

const PairYourPotContainer = ({ step }: StepProps) => {
  EspIdfProvisioningReactNative.create();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const route: RouteProp<ParamListBase> | any = useRoute();

  const scanFunc = useCallback(async () => {
    // await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION!);
    dispatch(PairActions.scanDevices.request());
    navigation.navigate('SelectBLT');
    console.log('scannnnn_______');
  }, []);

  const handlePairing = () => {
    scanFunc();
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
const mapStateToProps = createStructuredSelector({
  step: makeSelectStepPairing(),
});
export default connect(mapStateToProps)(PairYourPotContainer);

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
