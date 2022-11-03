import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, FlatListProps } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import { debounce, isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';
//components
import TopNavigationBar from '@Navigators/topNavigation';
import MenuIcon from '@Components/iconSvg/MenuIcon';
import SearchComp from '@Containers/Home/components/SearchComp';
import LoaderAnimationProgress from '@Components/lottie/loader';
import NoPlantComp from '@Containers/Home/components/NoPlantComp';

import { PropsScreen } from '@Interfaces/app';
import PlantBoxComp from '@Containers/Home/components/PlantBoxComp';
import { HomeActions } from '@Containers/Home/store/actions';
import { makeSelectIsRequesting, makeSelectMyPlant } from '@Containers/Home/store/selectors';

import { colors, fontFamily } from '@Theme/index';
import CardIcon from '@Components/iconSvg/shop/CardIcon';
import FilterComp from '@Containers/Pairing/components/FilterComp';
import { makeSelectListPlantGroup } from '@Containers/Pairing/store/selectors';

interface IProps extends PropsScreen {
  isLoading: boolean;
  myPlant: any;
  listPlantGroup: any;
}

function ShopContainer(props: IProps) {
  const { isLoading, myPlant, listPlantGroup } = props;
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchText, setSearchText] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => <TopNavigationBar {...p} children={<Text style={styles.titleTab}>{'Choose Plant'}</Text>} />,
    });
  }, [navigation]);

  const handleSearch = (value: string) => {
    const payload = {
      page,
      perpage: 10,
      search: value,
    };
    dispatch(HomeActions.getMyPlant.request(payload));
  };

  const searchDebounce = useCallback(debounce(handleSearch, 400), []);

  const handleChangeText = (text: string) => {
    setSearchText(text);
    searchDebounce(text);
  };

  const loadMoreMyPlant = () => {};
  const handleRefresh = () => {
    setIsRefresh(true);
  };

  useEffect(() => {
    const payload = {
      page,
      perpage: 10,
      search: searchText,
    };
    dispatch(HomeActions.getMyPlant.request(payload));
    isRefresh &&
      setTimeout(() => {
        setIsRefresh(false);
      }, 1000);
  }, [page, isRefresh, dispatch]);

  const handleGoToPairing = () => {
    navigation.navigate('Paring');
  };

  const _renderItem = ({ item }: any) => {
    return <PlantBoxComp data={item} />;
  };

  const handleFilter = () => {};

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <SearchComp onChangeText={handleChangeText} />
          <TouchableOpacity style={styles.addContainer} onPress={handleGoToPairing}>
            <CardIcon />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 10 }}>
          <FilterComp data={listPlantGroup} onFilter={handleFilter} />
        </View>
      </View>
      <FlatList
        data={myPlant}
        keyExtractor={(item, index) => `${item.uuid.toString()}_${item.name.toString()}_${index.toString()}`}
        renderItem={_renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreMyPlant}
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
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          isLoading && !isRefresh ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <LoaderAnimationProgress source={require('@Assets/lotties/loading.json')} width={200} />
            </View>
          ) : myPlant.length <= 0 ? (
            <NoPlantComp />
          ) : null
        }
        contentContainerStyle={styles.contenContainer}
        style={styles.scrollList}
      />
    </View>
  );
}

const mapStateToProps = createStructuredSelector({
  myPlant: makeSelectMyPlant(),
  isLoading: makeSelectIsRequesting(),
  listPlantGroup: makeSelectListPlantGroup(),
});

export default connect(mapStateToProps)(ShopContainer);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  headerContainer: {},
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  titleTab: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    textAlign: 'center',
    color: colors.black2,
  },
  addContainer: {
    width: 32,
    height: 32,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 6,
    marginLeft: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  scrollList: { width: '100%', flex: 1 },
  contenContainer: {
    flex: 1,
  },
});
