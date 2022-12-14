import { FlatList, PermissionsAndroid, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';
import { connect, useDispatch } from 'react-redux';

import { PropsScreen } from '@Interfaces/app';
import { PairActions } from '../store/actions';
import { makeSelectIsRequesting, makeSelectUuid } from '../store/selectors';

import LoaderAnimationProgress from '@Components/lottie/loader';
import NoPlantComp from '@Containers/Home/components/NoPlantComp';
import SkipIcon from '@Components/iconSvg/SkipIcon';
import Searching from './Searching';
import TitleComp from '../components/TitleComp';
import TopNavigationBar from '@Navigators/topNavigation';

import { colors, fontFamily } from '@Theme/index';
import { IS_ANDROID } from '@Constants/app';
// import { showErrorWithString } from '@Utils/helper';

interface IProps extends PropsScreen {
  isLoading: boolean;
  uuid: any;
}

function SelectBLTContainer(props: IProps) {
  // EspIdfProvisioningReactNative.create();
  const { isLoading = true, uuid, ...rest } = props;
  const navigation: any = useNavigation();
  const [txtSearch, setTxtSearch] = useState('_Searching');
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

  const connectBLE = async (item: any) => {
    await EspIdfProvisioningReactNative.setProofOfPossession('abcd1234');
    EspIdfProvisioningReactNative.connectToBLEDevice(item.serviceUuid)
      .then((_res: any) => {
        dispatch(PairActions.connectBLE.success(item?.deviceName || item?.name));
        navigation.navigate('ChoosePlant', { bluetooth_uid: item });
        IS_ANDROID && ToastAndroid.show('Connected to device', ToastAndroid.LONG);
      })
      .catch((e: any) => {
        dispatch(PairActions.connectBLE.fail(e));
        navigation.navigate('MessageAlert', {
          visible: true,
          title: e?.message || e || 'Connect to device error',
          callBack: navigation.goBack(),
        });
        IS_ANDROID && ToastAndroid.show('Connect to device error', ToastAndroid.LONG);
      });
  };

  const handleSelectBLT = (item: any) => async () => {
    IS_ANDROID && (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT));
    setTxtSearch('_Paring...');
    try {
      dispatch(PairActions.connectBLE.request());
      return new Promise(async resolve => {
        // await EspIdfProvisioningReactNative.setProofOfPossession('abcd1234');
        connectBLE(item);
        resolve(true);
      });
    } catch (error: any) {
      navigation.navigate('MessageAlert', {
        visible: true,
        title: error?.message || 'Connect to device error',
        callBack: navigation.goBack(),
      });
    }
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 52 }}
        onPress={handleSelectBLT(item)}>
        <Text style={{ color: colors.black2 }}>{item.deviceName || item.name}</Text>
        <SkipIcon />
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <Searching title={txtSearch} />;
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
