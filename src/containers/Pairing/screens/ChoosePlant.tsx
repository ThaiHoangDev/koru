import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
//redux
import { makeSelectIsRequesting, makeSelectListPlant, makeSelectUuid } from '../store/selectors';
//components
import TopNavigationBar from '@Navigators/topNavigation';
import PlantBox from '../components/PlantBox';
import SearchComp from '@Containers/Home/components/SearchComp';
import FilterComp from '../components/FilterComp';
import LoaderAnimationProgress from '@Components/lottie/loader';
import NoPlantComp from '@Containers/Home/components/NoPlantComp';
//util
import { PropsScreen } from '@Interfaces/app';
import { colors, fontFamily } from '@Theme/index';
import { PairActions } from '../store/actions';

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
  listPlant: any;
}

function ChoosePlantContainer(props: IProps) {
  EspIdfProvisioningReactNative.create();
  const { isLoading, listPlant, ...rest } = props;
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchText, setSearchText] = useState('');

  console.log(listPlant, 'kkkk___');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => (
        <TopNavigationBar {...p} isLeft children={<Text style={styles.txtTitle}>Choose plant</Text>} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const payload = {
      page: 1,
      perpage: 10,
      search: '',
      group: '',
      ordering: '',
    };
    dispatch(PairActions.getListPlant.request(payload));
  }, []);

  const handleRefresh = () => {
    setIsRefresh(true);
  };

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
      <TouchableOpacity style={[styles.element, { borderTopWidth: index === 0 ? 1 : 0 }]} onPress={handleChoosePlant}>
        <PlantBox name={item?.name} type={item?.species_name} uri={item?.species_image} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={_renderHeader}
      data={listPlant}
      renderItem={_renderItem}
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
      ListEmptyComponent={
        isLoading && !isRefresh ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LoaderAnimationProgress source={require('@Assets/lotties/loading.json')} width={200} />
          </View>
        ) : isEmpty(listPlant) ? (
          <NoPlantComp />
        ) : null
      }
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.grey06 }}></View>}
      keyExtractor={item => item.name.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsRequesting(),
  listPlant: makeSelectListPlant(),
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
  element: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 106,

    borderTopColor: colors.grey06,
  },
});
