import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, FlatListProps } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import { debounce, isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';
//components
import TopNavigationBar from '@Navigators/topNavigation';
import SearchComp from '@Containers/Home/components/SearchComp';
import LoaderAnimationProgress from '@Components/lottie/loader';
import NoPlantComp from '@Containers/Home/components/NoPlantComp';
import CardIcon from '@Components/iconSvg/shop/CardIcon';
import FilterComp from '@Containers/Pairing/components/FilterComp';
import { ShopStackParamList } from '@Navigators/shopNavigator';

import PlantBoxComp from '@Containers/Home/components/PlantBoxComp';
import { HomeActions } from '@Containers/Home/store/actions';
import { makeSelectIsRequesting, makeSelectMyPlant } from '@Containers/Home/store/selectors';
import { makeSelectListPlantGroup } from '@Containers/Pairing/store/selectors';

import { colors, fontFamily } from '@Theme/index';
import { makeSelectMyOrder } from '../store/selectors';
import { ShopActions } from '../store/actions';
import { HEIGHT } from '@Constants/app';
import { ShopScreenNavigationProps } from '@Interfaces/app';

interface IProps {
  isLoading: boolean;
  myPlant: any;
  myOrder: any;
  listPlantGroup: any;
}

function ShopContainer(props: IProps) {
  const navigation = useNavigation<ShopScreenNavigationProps>();
  const route = useRoute<RouteProp<ShopStackParamList, 'ShopScreen'>>();
  const { isLoading, myPlant, myOrder, listPlantGroup } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterGroup, setFilterGroup] = useState({
    group: '',
    ordering: '',
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (p: any) => <TopNavigationBar {...p} children={<Text style={styles.titleTab}>{'Choose Plant'}</Text>} />,
    });
  }, [navigation]);

  const handleSearch = (value: string) => {
    // const payload = {
    //   page,
    //   perpage: 10,
    //   search: value,
    // };
    // dispatch(HomeActions.getMyPlant.request(payload));
  };

  const searchDebounce = useCallback(debounce(handleSearch, 400), []);

  const handleChangeText = (text: string) => {
    setSearchText(text);
    searchDebounce(text);
  };

  const loadMoreMyPlant = () => {
    // dispatch(ShopActions.getMyOrder.request());
  };
  const handleRefresh = () => {
    setIsRefresh(true);
  };

  useEffect(() => {
    dispatch(ShopActions.getMyOrder.request());
  }, []);

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

  const handleGoToCard = () => {
    navigation.navigate('OrderScreen');
  };

  const onAddToCard = (uuid: any) => () => {
    dispatch(ShopActions.addToCard.request(uuid));
  };

  const _renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity style={styles.item}>
        <PlantBoxComp data={item} shopScreen={true} onAddToCard={onAddToCard(item.uuid)} />
      </TouchableOpacity>
    );
  };

  const handleFilter = () => {};

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <SearchComp onChangeText={handleChangeText} />
          <TouchableOpacity style={styles.addContainer} onPress={handleGoToCard}>
            <View style={styles.numOrder}>
              <Text style={styles.orderTotal}>{myOrder?.length}</Text>
            </View>
            <CardIcon />
          </TouchableOpacity>
        </View>
        <View style={{ height: 60, marginVertical: 6 }}>
          <FilterComp data={listPlantGroup} onFilter={handleFilter} filterGroup={filterGroup} />
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
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
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
  myOrder: makeSelectMyOrder(),
  isLoading: makeSelectIsRequesting(),
  listPlantGroup: makeSelectListPlantGroup(),
});

export default connect(mapStateToProps)(ShopContainer);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    height: HEIGHT / 8,
    marginBottom: 20,
  },
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
  item: {
    flex: 0.48,
    minHeight: 204,
    marginBottom: 20,
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
  numOrder: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 15,
    borderRadius: 50,
    right: -6,
    top: -6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderTotal: {
    color: colors.white2,
    fontFamily: fontFamily.Strawford,
    fontWeight: '400',
    fontSize: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  scrollList: { width: '100%', flex: 0.8 },
  contenContainer: {
    flexGrow: 1,
  },
});
