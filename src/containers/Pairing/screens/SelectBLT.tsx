import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';
import { createStructuredSelector } from 'reselect';

import TitleComp from '../components/TitleComp';
import TopNavigationBar from '@Navigators/topNavigation';

import { connect, useDispatch } from 'react-redux';
import { PropsScreen } from '@Interfaces/app';

import { makeSelectIsRequesting, makeSelectStepPairing, makeSelectUuid } from '../store/selectors';
import Searching from './Searching';
import { colors, fontFamily } from '@Theme/index';
import SkipIcon from '@Components/iconSvg/SkipIcon';

const BLT_LIST = [
  {
    label: 'KORU_F8F9FC',
  },
  {
    label: 'KORU_F8F9FC',
  },
  {
    label: 'KORU_F8F9FC',
  },
  {
    label: 'KORU_F8F9FC',
  },
  {
    label: 'KORU_F8F9FC',
  },
  {
    label: 'KORU_F8F9FC',
  },
];

interface IProps extends PropsScreen {
  isLoading: boolean;
}

function SelectBLTContainer(props: IProps) {
  EspIdfProvisioningReactNative.create();
  const { isLoading, ...rest } = props;
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

  const handleSelectBLT = () => {
    navigation.navigate('ChoosePlant');
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 52 }}
        onPress={handleSelectBLT}>
        <Text>{item.label}</Text>
        <SkipIcon />
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <Searching {...rest} />;
  }

  return (
    <FlatList
      ListHeaderComponent={<TitleComp title={'We found your pot.'} subTitle={'Devices List'} />}
      ListHeaderComponentStyle={{ marginBottom: 40, marginTop: 60 }}
      data={BLT_LIST}
      renderItem={_renderItem}
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.grey06 }}></View>}
      keyExtractor={item => item.label.toString()}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  step: makeSelectStepPairing(),
  isLoading: makeSelectIsRequesting(),
  uuid: makeSelectUuid(),
});
export default connect(mapStateToProps)(SelectBLTContainer);

const styles = StyleSheet.create({
  txtTitle: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
  },
});
