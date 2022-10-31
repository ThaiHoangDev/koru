import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';

//redux
import { createStructuredSelector } from 'reselect';

//components
import WifiIcon from '@Components/iconSvg/pairing/WifiIcon';
import TitleComp from '../components/TitleComp';
import TopNavigationBar from '@Navigators/topNavigation';
//type
import { PropsScreen } from '@Interfaces/app';
import { colors, fontFamily } from '@Theme/index';

interface IProps extends PropsScreen {
  step: number;
}

const WIFI_LIST = [
  {
    name: 'Digital Fortress 5G',
    type: 'Plant type',
    uri: '',
  },
  {
    name: 'Nahle',
    type: 'Plant type',
    uri: '',
  },
  {
    name: 'Wifi Name',
    type: 'Plant type',
    uri: '',
  },
  {
    name: 'Wifi Name2',
    type: 'Plant type',
    uri: '',
  },
  {
    name: 'Wifi Name3',
    type: 'Plant type',
    uri: '',
  },
  {
    name: 'Wifi Name4',
    type: 'Plant type',
    uri: '',
  },
  {
    name: 'Wifi Name5',
    type: 'Plant type',
    uri: '',
  },
];

function ChooseYourWifiContainer(props: IProps) {
  const { ...rest } = props;
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => <TopNavigationBar {...p} isLeft />,
    });
  }, [navigation]);

  const handleSelectWifi = () => {
    navigation.navigate('TypePassword');
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.contentFlatlist,
          { borderColor: colors.grey06, borderBottomWidth: 0, borderWidth: 1 },
          index === 0
            ? { borderTopLeftRadius: 16, borderTopRightRadius: 16 }
            : index === WIFI_LIST.length - 1
            ? { borderBottomLeftRadius: 16, borderBottomRightRadius: 16, borderBottomWidth: 1 }
            : null,
        ]}
        onPress={handleSelectWifi}>
        <Text style={styles.nameWifi}>{item.name}</Text>
        <WifiIcon />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={<TitleComp title={'_Choose your wifi'} subTitle={'Wifi List'} />}
      ListHeaderComponentStyle={styles.headerContainerFlat}
      data={WIFI_LIST}
      renderItem={_renderItem}
      keyExtractor={item => item.name.toString()}
    />
  );
}

export default connect()(ChooseYourWifiContainer);

const styles = StyleSheet.create({
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
