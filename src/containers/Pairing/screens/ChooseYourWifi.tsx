import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
//redux
import { createStructuredSelector } from 'reselect';
import { makeSelectIsRequesting, makeSelectNetworks } from '../store/selectors';
import { PairActions } from '../store/actions';
//components
import WifiIcon from '@Components/iconSvg/pairing/WifiIcon';
import TitleComp from '../components/TitleComp';
import TopNavigationBar from '@Navigators/topNavigation';
import NoPlantComp from '@Containers/Home/components/NoPlantComp';
import LoaderAnimationProgress from '@Components/lottie/loader';
//type
import { PropsScreen } from '@Interfaces/app';
import { colors, fontFamily } from '@Theme/index';

interface IProps extends PropsScreen {
  listWifiScan: any;
  isLoading: boolean;
}

function ChooseYourWifiContainer(props: IProps) {
  const { listWifiScan, isLoading, ...rest } = props;
  const [isRefresh, setIsRefresh] = useState(false);
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => <TopNavigationBar {...p} isLeft />,
    });
  }, [navigation]);

  const handleSelectWifi = (ssid: any) => () => {
    navigation.navigate('TypePassword', { ssid });
  };

  useEffect(() => {
    dispatch(PairActions.scanNetworks.request());
    setTimeout(() => {
      isRefresh && setIsRefresh(false);
    }, 400);
  }, [isRefresh]);

  const handleRefresh = () => {
    setIsRefresh(true);
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.contentFlatlist,
          { borderColor: colors.grey06, borderBottomWidth: 0, borderWidth: 1 },
          index === 0
            ? { borderTopLeftRadius: 16, borderTopRightRadius: 16 }
            : index === listWifiScan.length - 1
            ? { borderBottomLeftRadius: 16, borderBottomRightRadius: 16, borderBottomWidth: 1 }
            : null,
        ]}
        onPress={handleSelectWifi(item.ssid)}>
        <Text style={styles.nameWifi}>{item.ssid}</Text>
        <WifiIcon />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.root}
      ListHeaderComponent={<TitleComp title={'_Choose your wifi'} subTitle={'Wifi List'} />}
      ListHeaderComponentStyle={styles.headerContainerFlat}
      data={listWifiScan}
      renderItem={_renderItem}
      keyExtractor={item => item.ssid.toString()}
      ListEmptyComponent={
        isLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LoaderAnimationProgress source={require('@Assets/lotties/loading.json')} width={200} />
          </View>
        ) : isEmpty(listWifiScan) ? (
          <NoPlantComp />
        ) : null
      }
      refreshControl={
        <RefreshControl
          tintColor={'#fff'}
          refreshing={isRefresh}
          onRefresh={handleRefresh}
          children={
            isRefresh && (
              <View style={{ alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
                <LoaderAnimationProgress source={require('@Assets/lotties/refreshing.json')} width={30} />
              </View>
            )
          }
        />
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsRequesting(),
  listWifiScan: makeSelectNetworks(),
});

export default connect(mapStateToProps)(ChooseYourWifiContainer);

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
  },
  contentFlatlist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 52,
    paddingHorizontal: 20,
  },
  headerContainerFlat: {
    paddingVertical: 20,
  },
  nameWifi: {
    color: colors.black2,
    fontFamily: fontFamily.Strawford,
    fontSize: 16,
  },
});
