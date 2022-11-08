import { FlatList, PermissionsAndroid, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { connect, useDispatch } from 'react-redux';

import { PropsScreen } from '@Interfaces/app';
import { PairActions } from '../store/actions';

import LoaderAnimationProgress from '@Components/lottie/loader';
import NoPlantComp from '@Containers/Home/components/NoPlantComp';
import SkipIcon from '@Components/iconSvg/SkipIcon';
import Searching from './Searching';
import TitleComp from '../components/TitleComp';
import TopNavigationBar from '@Navigators/topNavigation';

import { makeSelectIsRequesting, makeSelectUuid } from '../store/selectors';
import { colors, fontFamily } from '@Theme/index';
import { showErrorMessage } from '@Utils/helper';
import { IS_ANDROID } from '@Constants/app';

interface IProps extends PropsScreen {
  isLoading: boolean;
  uuid: any;
}

function SelectBLTContainer(props: IProps) {
  EspIdfProvisioningReactNative.create();
  const { isLoading = true, uuid, ...rest } = props;
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    if (isLoading) {
      navigation.setOptions({ headerShown: false });
    } else {
      navigation.setOptions({
        headerShown: true,
        header: (p: any) => (
          <TopNavigationBar {...p} isLeft children={<Text style={styles.txtTitle}>Bluetooth Device</Text>} />
        ),
      });
    }
  }, [navigation, isLoading]);

  const scanBLT = useCallback(async () => {
    console.log('sacnnnn____');
    try {
      dispatch(PairActions.scanDevices.request());
      if (IS_ANDROID) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
      }
      await EspIdfProvisioningReactNative.scanBleDevices('SPOT_')
        .then((res: any[]) => {
          console.log(res, 'sacnnnnningggggggg____');
          if (res.length > 0) {
            dispatch(PairActions.scanDevices.success(res));
          } else {
            dispatch(PairActions.scanDevices.fail());
            showErrorMessage({ message: 'Scan BLE failed!' }, () => {
              navigation.goBack();
            });
          }
        })
        .catch((e: any) => {
          console.log(e, 'sacnnnnn');
          dispatch(PairActions.scanDevices.fail());
          showErrorMessage({ message: 'Scan BLE failed!' }, () => {
            navigation.goBack();
          });
        });
    } catch (error) {
      showErrorMessage(error, () => {});
    }
  }, [navigation]);

  useEffect(() => {
    scanBLT();
  }, [navigation]);

  const connectToBLEDevice = useCallback(async (uuid: any) => {
    try {
      dispatch(PairActions.connectBLE.request());
      IS_ANDROID && (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT));
      EspIdfProvisioningReactNative.setProofOfPossession('abcd1234');
      EspIdfProvisioningReactNative.connectToBLEDevice(uuid)
        .then((_res: any) => {
          dispatch(PairActions.connectBLE.success(uuid));
          console.log(uuid, _res, 'uuu___IDDD');
          navigation.navigate('ChoosePlant', { bluetooth_uid: uuid });
          ToastAndroid.show('Connected to device', ToastAndroid.LONG);
        })
        .catch((e: any) => {
          dispatch(PairActions.connectBLE.fail(e));
          console.log(e, 'uuu___IDDD_FAILED');
          showErrorMessage(e, () => {});
          ToastAndroid.show('Connect to device error', ToastAndroid.LONG);
        });
    } catch (error) {
      console.log(error, 'connect error');
      showErrorMessage(error, () => {});
    }
  }, []);

  const handleSelectBLT = (uuid: any) => () => {
    connectToBLEDevice(uuid);
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 52 }}
        onPress={handleSelectBLT(item.serviceUuid)}>
        <Text style={{ color: colors.black2 }}>{item.deviceName || item.name}</Text>
        <SkipIcon />
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <Searching />;
  }

  return (
    <FlatList
      ListHeaderComponent={<TitleComp title={'We found your pot.'} subTitle={'Devices List'} />}
      ListHeaderComponentStyle={{ marginBottom: 40, marginTop: 60 }}
      data={uuid}
      renderItem={_renderItem}
      ListEmptyComponent={
        isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LoaderAnimationProgress source={require('@Assets/lotties/loading.json')} width={200} />
          </View>
        ) : isEmpty(uuid) ? (
          <NoPlantComp />
        ) : null
      }
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.grey06 }}></View>}
      keyExtractor={item => item.serviceUuid.toString()}
      style={styles.container}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsRequesting(),
  uuid: makeSelectUuid(),
});
export default connect(mapStateToProps)(SelectBLTContainer);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  txtTitle: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
  },
});
