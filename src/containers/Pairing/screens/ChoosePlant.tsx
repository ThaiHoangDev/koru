import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
//redux
import { makeSelectUuid } from '../store/selectors';
//components
import TopNavigationBar from '@Navigators/topNavigation';
import PlantBox from '../components/PlantBox';
import SearchComp from '@Containers/Home/components/SearchComp';
import FilterComp from '../components/FilterComp';
//util
import { PropsScreen } from '@Interfaces/app';
import { colors, fontFamily } from '@Theme/index';

const PLANT_LIST = [
  {
    name: 'Nahle',
    type: 'Plant type',
    uri: '',
  },
  {
    name: 'Nahle',
    type: 'Plant type',
    uri: '',
  },
  {
    name: 'Nahle',
    type: 'Plant type',
    uri: '',
  },
  {
    name: 'Nahle',
    type: 'Plant type',
    uri: '',
  },
  {
    name: 'Nahle',
    type: 'Plant type',
    uri: '',
  },
  {
    name: 'Nahle',
    type: 'Plant type',
    uri: '',
  },
  {
    name: 'Nahle',
    type: 'Plant type',
    uri: '',
  },
];

interface IProps extends PropsScreen {
  isLoading: boolean;
}

function ChoosePlantContainer(props: IProps) {
  EspIdfProvisioningReactNative.create();
  const { isLoading, ...rest } = props;
  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => (
        <TopNavigationBar {...p} isLeft children={<Text style={styles.txtTitle}>Choose plant</Text>} />
      ),
    });
  }, [navigation]);

  const handleChoosePlant = () => {
    navigation.navigate('NamePlant');
  };

  const _renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.subTitle}>Search for the plant you watn to grow</Text>
        </View>
        <SearchComp />
        <View style={{ marginVertical: 20 }}>
          <FilterComp />
        </View>
      </View>
    );
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 106,
          borderTopWidth: index === 0 ? 1 : 0,
          borderTopColor: colors.grey06,
        }}
        onPress={handleChoosePlant}>
        <PlantBox name={item.name} type={item.type} uri={''} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={_renderHeader}
      data={PLANT_LIST}
      renderItem={_renderItem}
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.grey06 }}></View>}
      keyExtractor={item => item.name.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  uuid: makeSelectUuid(),
});
export default connect(mapStateToProps)(ChoosePlantContainer);

const styles = StyleSheet.create({
  headerContainer: {},
  txtTitle: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
  },
  subTitle: {
    fontFamily: fontFamily.Strawford,
    fontSize: 16,
    color: colors.grey06,
  },
});
