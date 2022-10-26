import { View, Text, StyleSheet, TouchableOpacity, FlatList, RefreshControl, FlatListProps } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import { debounce, isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';
import RefreshableWrapper from 'react-native-fresh-refresh';
//components
import TopNavigationBar from '@Navigators/topNavigation';
import MenuIcon from '@Components/iconSvg/MenuIcon';
import SearchComp from '@Containers/Home/components/SearchComp';
import AddIcon from '@Components/iconSvg/AddIcon';
import LoaderAnimationProgress from '@Components/lottie/loader';
import NoPlantComp from '@Containers/Home/components/NoPlantComp';

import { PropsScreen } from '@Interfaces/app';
import { HomeActions } from '@Containers/Home/store/actions';
import { makeSelectIsRequesting } from '@Containers/Home/store/selectors';
import { makeSelectListPlant } from '@Containers/Pairing/store/selectors';

import { fontFamily } from '@Theme/index';

interface IProps extends PropsScreen {
  isLoading: boolean;
  myPlant: any;
}

function HomeContainer(props: IProps) {
  const { isLoading, myPlant } = props;
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchText, setSearchText] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => (
        <TopNavigationBar {...p} children={<Text style={styles.titleTab}>{'My Koru'}</Text>} right={<MenuIcon />} />
      ),
    });
  }, [navigation, route]);

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
  }, [page, isRefresh]);

  const handleGoToPairing = () => {
    navigation.navigate('Paring');
  };

  const _renderItem = ({ item }: any) => {
    return <></>;
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.headerContainer}>
        <SearchComp onChangeText={handleChangeText} />
        <TouchableOpacity style={styles.addContainer} onPress={handleGoToPairing}>
          <AddIcon />
        </TouchableOpacity>
      </View>
      <FlatList
        data={myPlant}
        keyExtractor={item => item.toString()}
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
          ) : isEmpty(myPlant) ? (
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
  myPlant: makeSelectListPlant(),
  isLoading: makeSelectIsRequesting(),
});

export default connect(mapStateToProps)(HomeContainer);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  titleTab: {
    fontFamily: fontFamily.FreightBigProMedium,
    fontSize: 32,
    textAlign: 'center',
  },
  addContainer: {
    width: 50,
    alignItems: 'flex-end',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  scrollList: { width: '100%', flex: 1 },

  contenContainer: {
    flex: 1,
  },
});
