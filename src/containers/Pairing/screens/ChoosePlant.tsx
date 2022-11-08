import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import EspIdfProvisioningReactNative from '@digitalfortress-dev/esp-idf-provisioning-react-native';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { debounce, isEmpty } from 'lodash';
//redux
import {
  makeSelectIsRequesting,
  makeSelectListPlant,
  makeSelectListPlantGroup,
  makeSelectUuid,
} from '../store/selectors';
import { PairActions } from '../store/actions';
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
import { HEIGHT } from '@Constants/app';

const PERPAGE = 10;

interface IProps extends PropsScreen {
  isLoading: boolean;
  listPlant: any;
  listPlantGroup: any;
}

function ChoosePlantContainer(props: IProps) {
  EspIdfProvisioningReactNative.create();
  const { isLoading, listPlant, listPlantGroup, ...rest } = props;
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);
  const [filterGroup, setFilterGroup] = useState({
    group: '',
    ordering: '',
  });

  const [searchText, setSearchText] = useState('');

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
      page: page,
      perpage: PERPAGE,
      search: searchText,
      group: filterGroup.group,
      ordering: filterGroup.ordering,
    };
    dispatch(PairActions.getListPlant.request(payload));
    isRefresh &&
      setTimeout(() => {
        setIsRefresh(false);
      }, 1000);
  }, [page, isRefresh, filterGroup]);

  useEffect(() => {
    setPage(1);
  }, [isRefresh]);

  useEffect(() => {
    const payload = {
      page,
      perpage: PERPAGE,
      search: '',
    };
    dispatch(PairActions.getListPlantGroup.request(payload));
  }, []);

  const loadMorePlant = () => {};
  const handleRefresh = () => {
    setIsRefresh(true);
  };

  const handleChangeText = (text: string) => {
    setSearchText(text);
    searchDebounce(text);
  };

  const handleSearch = (value: string) => {
    const payload = {
      page,
      perpage: PERPAGE,
      search: value,
      group: '',
      ordering: '',
    };
    dispatch(PairActions.getListPlant.request(payload));
  };

  const searchDebounce = useCallback(debounce(handleSearch, 400), []);

  const handleChoosePlant = (item: any) => () => {
    navigation.navigate('NamePlant', { plant: item });
  };

  const handleFilter = (item: any) => {
    setFilterGroup(item);
  };

  const _renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.subTitle}>Search for the plant you watn to grow</Text>
        </View>
        <SearchComp onChangeText={handleChangeText} />
        <View
          style={{
            marginVertical: 10,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FilterComp data={listPlantGroup} onFilter={handleFilter} />
        </View>
      </View>
    );
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={[styles.element, { borderTopWidth: index === 0 ? 1 : 0 }]}
        onPress={handleChoosePlant(item)}>
        <PlantBox name={item?.name} type={item?.latin_name} uri={item?.image_url} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {_renderHeader()}
      <FlatList
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
        onEndReached={loadMorePlant}
        onEndReachedThreshold={0.5}
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
        style={{ flex: 1 }}
      />
    </View>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsRequesting(),
  listPlant: makeSelectListPlant(),
  listPlantGroup: makeSelectListPlantGroup(),
});
export default connect(mapStateToProps)(ChoosePlantContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flex: 0.3,
  },
  txtTitle: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    color: colors.black2,
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
    paddingVertical: 20,
    marginVertical: 10,
    borderTopColor: colors.grey06,
  },
});
