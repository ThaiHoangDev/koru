import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Pressable, PermissionsAndroid } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';
import { useDispatch } from 'react-redux';
// utils

// components by self
import StartPairing from '@Components/iconSvg/pairing/StartPairing';
import TitleComp from '../components/TitleComp';
import TopNavigationBar from '@Navigators/topNavigation';
// assets
import { fontFamily } from '@Theme/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { PairStackParamList } from '@Navigators/paringNavigator';

import { IS_ANDROID } from '@Constants/app';
import { PairActions } from '../store/actions';
import Searching from './Searching';

type PairScreenNavigationProp = StackNavigationProp<PairStackParamList, 'ParingScreen'>;
type PairScreenRouteProp = RouteProp<PairStackParamList, 'ParingScreen'>;

interface Iprops {
  route: PairScreenRouteProp;
  navigation: PairScreenNavigationProp;
}

const PairYourPotContainer = (props: Iprops) => {
  EspIdfProvisioningReactNative.create();
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => <TopNavigationBar {...p} isLeft />,
    });
  }, [navigation]);

  const handlePairing = useCallback(async () => {
    try {
      setIsLoading(true);
      dispatch(PairActions.scanDevices.request());
      if (IS_ANDROID) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
      }
      await EspIdfProvisioningReactNative.scanBleDevices('KORU_')
        .then((res: any[]) => {
          if (res.length > 0) {
            dispatch(PairActions.scanDevices.success(res));
            navigation.navigate('SelectBLT');
          } else {
            dispatch(PairActions.scanDevices.fail());
            navigation.navigate('MessageAlert', {
              visible: true,
              title: `Don't have any device!`,
            });
            setIsLoading(false);
          }
        })
        .catch((e: any) => {
          dispatch(PairActions.scanDevices.fail());
          navigation.navigate('MessageAlert', {
            visible: true,
            title: e?.message || 'Scan BLE failed!',
          });
        });
    } catch (error: any) {
      dispatch(PairActions.scanDevices.fail());
      navigation.navigate('MessageAlert', {
        visible: true,
        title: 'Scan BLE failed!',
        callBack: navigation.goBack(),
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Searching title={'_Searching'} />;
  }

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

export default PairYourPotContainer;

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
